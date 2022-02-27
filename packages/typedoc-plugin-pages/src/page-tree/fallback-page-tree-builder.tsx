import { copyFileSync } from 'fs';
import { join, resolve } from 'path';

import { DefaultTheme, JSX, PageEvent, Reflection, ReflectionKind, RenderTemplate, RendererEvent, UrlMapping } from 'typedoc';

import type { PagesPlugin } from '../plugin';
import { MenuReflection, NodeReflection, PageReflection } from '../reflections';
import { RenderPageLinkProps } from '../theme';
import { APageTreeBuilder } from './a-page-tree-builder';
import { fallbackRenderPageLink } from './fallback-render-page-link';
import { traverseDeep } from './utils';

const CSS_FILE_NAME = 'assets/pages.css';
export class FallbackPageTreeBuilder extends APageTreeBuilder {
	public constructor( protected override readonly theme: DefaultTheme, themeName: string, plugin: PagesPlugin ){
		super( theme, plugin );
		plugin.logger.warn( `The current theme "${themeName}" is not compatible with the plugin. Using fallback pages tree builder.` );
		const { renderer } = theme.application;
		// Add stylesheet
		renderer.on( RendererEvent.END, this._onRenderEnd.bind( this ) );
		renderer.hooks.on( 'head.end', context => <link rel="stylesheet" href={context.relativeURL( CSS_FILE_NAME )} /> );
	}

	public renderPageLink: RenderTemplate<RenderPageLinkProps> = props =>
		fallbackRenderPageLink( { ...props, theme: this.theme } );

	/**
	 * In fallback mode, all page nodes are identified as {@link ReflectionKind.Namespace}.
	 *
	 * @returns the namespace reflection kind.
	 */
	protected override getReflectionKind(): ReflectionKind {
		return ReflectionKind.Namespace;
	}

	/**
	 * Generate mappings (pages) from the given node reflections.
	 *
	 * @param reflections - The list of node reflections (pages & menu).
	 * @returns the list of mappings to create.
	 */
	protected generateMappings( reflections: readonly NodeReflection[] ): Array<UrlMapping<PageReflection>> {
		const pagesReflections: PageReflection[] = [];
		const allChildReflection: NodeReflection[] = [];
		const harvestReflection = ( reflection: Reflection ) => {
			if( reflection instanceof PageReflection ){
				pagesReflections.push( reflection );
				allChildReflection.push( reflection );
			} else if( reflection instanceof MenuReflection ){
				allChildReflection.push( reflection );
			}
		};
		traverseDeep( reflections, r => harvestReflection( r ) );
		allChildReflection.forEach( r => delete r.children );
		return pagesReflections.map( r => new UrlMapping( r.url, r, this._renderPage ) );
	}

	/**
	 * Register the {@link nodeReflection} into the correct reflection (project or module).
	 *
	 * @param nodeReflection - The node reflection.
	 */
	protected addNodeToProjectAsChild( nodeReflection: NodeReflection ): void {
		nodeReflection.cssClasses = [
			'pages-entry',
			nodeReflection instanceof PageReflection ? 'pages-entry-page' : 'pages-entry-menu',
			`pages-entry-depth-${nodeReflection.depth}`,
			...( nodeReflection.cssClasses?.split( ' ' ) ?? [] ),
		].join( ' ' );
		nodeReflection.module.children = ( [
			nodeReflection,
			...( nodeReflection.module.children ?? [] ),
		] );
	}

	private readonly _renderPage: RenderTemplate<PageEvent<PageReflection>> = props => {
		( props.model as any ).readme = props.model.content;
		return this.theme.indexTemplate( props as PageEvent<any> );
	};
	/**
	 * Copy assets to the output directory.
	 *
	 * @param event - The {@link RendererEvent.END} event.
	 */
	private _onRenderEnd( event: RendererEvent ) {
		const dest = join( event.outputDirectory, CSS_FILE_NAME );
		const src = resolve( __dirname, '../../static/pages.css' );
		copyFileSync( src, dest );
	}
}