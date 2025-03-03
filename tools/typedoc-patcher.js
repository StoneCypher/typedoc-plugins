const assert = require( 'assert' );
const { constants } = require( 'fs' );
const { readFile, access, open } = require( 'fs/promises' );
const { resolve, dirname, relative } = require( 'path' );

const { red, bold, green } = require( 'chalk' );
const { memoize } = require( 'lodash' );

const { spawn, globAsync, createStash, commonPath, selectProjects, captureStream } = require( './utils' );

const getPatchName = f => `${f}.patch`;
const assertWritable = memoize( async filePath => {
	await access( filePath, constants.W_OK );
	return filePath;
} );
const getSourceFromGenerated = memoize( async filePath => {
	const content = await readFile( filePath, 'utf-8' );
	const header = content.match( /^.*?Edit of <(.+)>.*?\r?\n/ );
	if( !header ){
		console.error( `Can't extract header from ${filePath}` );
	}
	const dir = dirname( resolve( filePath ) );
	const sourceFile = resolve( dir, header[1].replace( /^~\//, `${dirname( __dirname )}/` ) );
	return assertWritable( sourceFile );
} );
const getSourceFromPatch = memoize( async patchPath => {
	const match = ( await readFile( patchPath, 'utf-8' ) ).match( /^.*\r?\n.*\r?\n--- a\/(.+)\r?\n/ );
	assert( match && match[1], `Invalid patch header in ${patchPath}` );
	return assertWritable( resolve( match[1] ) );
} );
const restoreSourceFiles = files => files.length > 0 ?
	spawn(
		'git', [ 'checkout', 'HEAD', '--', ...files ],
		{
			cwd: files.length === 1 ?
				dirname( files[0] ) :
				commonPath( files.map( dirname ) ),
			// See https://stackoverflow.com/questions/18292478/commit-to-submodule-from-post-commit-hook
			env: {
				...process.env,
				GIT_DIR: undefined,
				GIT_INDEX_FILE: undefined,
			},
		} ) :
	Promise.resolve();
const formatFiles = files => files.length > 0 ?
	spawn(
		process.platform === 'win32' ? '.\\node_modules\\.bin\\eslint.cmd' : './node_modules/.bin/eslint',
		[ '--cache-location', './.eslintcache-patch', '--no-ignore', '--config', './.eslintrc-typedoc.js', '--fix', ...files ],
		{ stdio: [] } ).catch( err => err.message.startsWith( 'Exit code ' ) ? Promise.resolve() : Promise.reject( err ) ) :
	Promise.resolve();


// Parse args
const { explicitProjects, command, stash } = process.argv.slice( 2 )
	.reduce( ( acc, arg ) => {
		if( arg === '--no-stash' ){
			return { ...acc, stash: false };
		} else if( arg === 'diff' || arg === 'apply' ){
			return { ...acc, command: arg };
		} else {
			return { ...acc, explicitProjects: [ ...acc.explicitProjects, arg ] };
		}
	}, { explicitProjects: [], command: '', stash: true } );
const projects = selectProjects( explicitProjects );
const generatedPattern = '**/*.GENERATED?(.*)';
const generatePattern = () => {
	if( projects.length < 1 ){
		return generatedPattern;
	} else if( projects.length === 1 ){
		return `${projects[0].path}/${generatedPattern}`.replace( /^\.\//, '' );
	} else {
		const common = commonPath( projects.map( p => p.path ) );
		const pattern = `${common}/@(${projects.map( p => relative( common, p.path ) ).join( '|' )})/${generatedPattern}`.replace( /^\.\//, '' );
		return pattern;
	}
};




( async () => {
	const pattern = generatePattern();
	switch( command ){
		case 'diff': {
			if( stash ){
				await createStash( 'typedoc-patcher: diff' );
			}
			const generatedFiles = await globAsync( pattern, { ignore: [ '**/dist/**', '**/node_modules/**', getPatchName( generatedPattern ) ] } );
			const stagedPatchesOutput = captureStream();
			await spawn( 'git', [ 'diff', '--name-only', '--cached', '--', ...generatedFiles.map( f => getPatchName( f ) ) ], { stdio: [ null, stagedPatchesOutput, null ] } );
			console.log( `Generating patches on ${generatedFiles}` );
			const filesWithSource = await Promise.all( generatedFiles.map( async file => ( { file, source: await getSourceFromGenerated( file ) } ) ) );
			await formatFiles( filesWithSource.map( ( { source } ) => source ) );
			try {
				await Promise.all( filesWithSource.map( async ( { file, source } ) => {
					const sourceRel = relative( process.cwd(), source ).replace( /\\/g, '/' );
					// eslint-disable-next-line no-bitwise -- Binary mask mode
					const patchHandle = await open( getPatchName( file ), constants.O_WRONLY | constants.O_CREAT | constants.O_TRUNC );
					const patchFileStream = patchHandle.createWriteStream();
					await spawn(
						'git', [ 'diff', '--no-renames', '--no-index', '--relative', sourceRel, file ],
						{ stdio: [ null, patchFileStream, process.stderr ] } ).catch( () => Promise.resolve() );
					patchFileStream.end();
					console.log( `Generated patch from ${bold( red( sourceRel ) )} to ${bold( green( file ) )}` );
				} ) );
			} finally {
				await restoreSourceFiles( filesWithSource.map( ( { source } ) => source ) );
			}
			const stagedFiles = stagedPatchesOutput.read().split( /\r?\n/ )
				.filter( staged => generatedFiles.some( f => getPatchName( f ) === staged ) );
			if( stagedFiles.length > 0 ){
				await spawn( 'git', [ 'add', ...stagedFiles ] );
			}
		} break;

		case 'apply': {
			if( stash ){
				await createStash( 'typedoc-patcher: apply' );
			}
			const patchFiles = await globAsync( getPatchName( pattern ), { ignore: [ '**/dist/**', '**/node_modules/**' ] } );
			console.log( `Applying patches from ${patchFiles}` );
			const patchesWithSources = await Promise.all( patchFiles.map( async patch => ( { patch, source: await getSourceFromPatch( patch ) } ) ) );
			await formatFiles( patchesWithSources.map( ( { source } ) => source ) );

			try {
				for( const { patch, source } of patchesWithSources ){
					const errStream = captureStream();
					const file = patch.replace( /\.patch$/, '' );
					try {
						await spawn( 'git', [ 'apply', '--ignore-space-change', '--ignore-whitespace', '--whitespace=fix', patch ], { stdio: [ null, 'pipe', errStream ] }  );
						console.log( `Applied patch from ${bold( red( relative( process.cwd(), source ) ) )} to ${bold( green( file ) )}` );
					} catch( e ){
						console.error( `Failed to apply patch from ${bold( red( relative( process.cwd(), source ) ) )} to ${bold( green( file ) )}: \n${e}` );
						console.error( errStream.read().split( '\n' ).map( v => `> ${v}` ).join( '\n' ) );
						throw e;
					}
				}
			} finally {
				await restoreSourceFiles( patchesWithSources.map( ( { source } ) => source ) );
			}
		} break;

		default: {
			throw new Error( `Invalid command "${command}"` );
		}
	}

} )();
