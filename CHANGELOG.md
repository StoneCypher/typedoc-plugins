## [0.22.6](https://github.com/KnodesCommunity/typedoc-plugins/compare/v0.22.5...v0.22.6) (2022-06-27)


### Bug Fixes

* add lodash as a dependency ([6306880](https://github.com/KnodesCommunity/typedoc-plugins/commit/6306880f7c248e2ea1e94adf5bae396702db6661)), closes [#99](https://github.com/KnodesCommunity/typedoc-plugins/issues/99)
* **build:** typedoc patcher truncate file on open ([cdb4fca](https://github.com/KnodesCommunity/typedoc-plugins/commit/cdb4fca980e6ab333498de1cb7c2f5d1880522d5))
* continue fixes for Windows scripts ([40f8d1d](https://github.com/KnodesCommunity/typedoc-plugins/commit/40f8d1d63bd54f6d68fb28d6a72f3be238799215))
* continue normalize behaviors between windows & non-windows ([c1803ef](https://github.com/KnodesCommunity/typedoc-plugins/commit/c1803ef30033890e5ee8dbb4f94868c15e1e3805))
* **deps:** update dependency memfs to v3.4.3 ([445a9cc](https://github.com/KnodesCommunity/typedoc-plugins/commit/445a9cc2b588487dc34144130dcc0435e56a37f2))
* **deps:** update dependency memfs to v3.4.4 ([2d83aa6](https://github.com/KnodesCommunity/typedoc-plugins/commit/2d83aa6758ed3f8cf8d32a0953aee641a3ee46df))
* normalize behavior between POSIX & Windows systems ([3ce9434](https://github.com/KnodesCommunity/typedoc-plugins/commit/3ce9434100e9e87d5af8a9dd6536a8ea93e5342c))



## [0.22.5](https://github.com/KnodesCommunity/typedoc-plugins/compare/v0.22.4...v0.22.5) (2022-04-30)


### Bug Fixes

* **deps:** update dependency semver to v7.3.7 ([42fbe4a](https://github.com/KnodesCommunity/typedoc-plugins/commit/42fbe4a60fd5e008c4d80bc269a4cc2e060c126a))


### Features

* **plugin-monorepo-readmes:** add option to pass different targets to find the closest README.md near to them ([2dc6806](https://github.com/KnodesCommunity/typedoc-plugins/commit/2dc6806fffbb1b2bbaae4554fedafdff55ac1203))



## [0.22.4](https://github.com/KnodesCommunity/typedoc-plugins/compare/v0.22.3...v0.22.4) (2022-04-07)



## [0.22.3](https://github.com/KnodesCommunity/typedoc-plugins/compare/v0.22.2...v0.22.3) (2022-03-21)


### Bug Fixes

* **plugin-monorepo-readmes:** properly resolve README.md from module source ([186e361](https://github.com/KnodesCommunity/typedoc-plugins/commit/186e3616f8e42dae7d6c74631daee44e214568cb)), closes [#21](https://github.com/KnodesCommunity/typedoc-plugins/issues/21)



## [0.22.2](https://github.com/KnodesCommunity/typedoc-plugins/compare/v0.22.1...v0.22.2) (2022-03-06)


### Bug Fixes

* **plugin-pages:** include missing `static` folder in package files ([1889d89](https://github.com/KnodesCommunity/typedoc-plugins/commit/1889d8919b90bb8716bd9b6d97962bab5ad17132))



## 0.22.1 (2022-03-04)


### Bug Fixes

* fix events order, bind TypeDoc prototypes to watch custom events ([83ee577](https://github.com/KnodesCommunity/typedoc-plugins/commit/83ee5776cea435fd4b5d155d1bd96f99737a5063))
* various reflection path resolution fixes, better test code blocks ([314f173](https://github.com/KnodesCommunity/typedoc-plugins/commit/314f173d5430f452a9924569db8f38575337c638))


### Features

* **plugin-code-blocks:** add [@inline-codeblock](https://github.com/inline-codeblock) macro ([6d5dff4](https://github.com/KnodesCommunity/typedoc-plugins/commit/6d5dff450bc7e467ed95e88578af75ccbb8c6949))
* **plugin-code-blocks:** use new plugin format & tools ([f1d52ba](https://github.com/KnodesCommunity/typedoc-plugins/commit/f1d52bac0340bf15e65baecee46c022789dffba3))
* **plugin-code-blocks:** use pluginutils ABasePlugin, use new options format ([33b1700](https://github.com/KnodesCommunity/typedoc-plugins/commit/33b17004f75a06495931405b08e093768bf3f50c))
* **plugin-code-blocks:** use theme-like approach for code blocks rendering, add projects path alias ([37521ed](https://github.com/KnodesCommunity/typedoc-plugins/commit/37521ed38ab651bf2f5389fd7a6b0c092555caa7))
* **plugin-monorepo-readmes:** add plugin ([7c9bc9c](https://github.com/KnodesCommunity/typedoc-plugins/commit/7c9bc9c167211a0201a54559c0f75ee5fc249f12))
* **plugin-pages:** add plugin ([2434d33](https://github.com/KnodesCommunity/typedoc-plugins/commit/2434d33399ec66e3c876e2a54cfa8a66bae77966))
* **plugin-pages:** add search support ([08242d4](https://github.com/KnodesCommunity/typedoc-plugins/commit/08242d4449c84dd9bdf3af7c9c98dee496c15d59))
* **plugin-pages:** add support for plugin-scoped log level ([48984d5](https://github.com/KnodesCommunity/typedoc-plugins/commit/48984d5aa67bde7c660e731200a0171b11f8e5a6))
* **plugin-pages:** allow relative resolution of pages, add `~~` alias, change render link signature ([8676ae4](https://github.com/KnodesCommunity/typedoc-plugins/commit/8676ae47f068a1b6ec76f4dd245e80f5e08e2d09))
* **plugin-pages:** fallback default theme: add css file, stylize menu entries ([4bc43f0](https://github.com/KnodesCommunity/typedoc-plugins/commit/4bc43f011496c971f73ae5230f79f30c806a66d0))
* **plugin-pages:** remove `workspace` node field (attach to module by name), various tweaks & fixes ([31e906a](https://github.com/KnodesCommunity/typedoc-plugins/commit/31e906abeba79a39d6d31b4c2fd3686d2e0f15a0))
* **plugin-pages:** strip empty groups with a warning message ([3a7733d](https://github.com/KnodesCommunity/typedoc-plugins/commit/3a7733d0a0f07f374ef367ecc723390d7d0550df))
* **plugin-pages:** use new option format, fix issue with pages ordering, rework theme plugins ([0afdf9d](https://github.com/KnodesCommunity/typedoc-plugins/commit/0afdf9deb168f3330d3ee7e8c5ffdba81dc4f2ba))
* **plugin-pages:** validate pages option ([1634a2e](https://github.com/KnodesCommunity/typedoc-plugins/commit/1634a2ee40b97dfff9c81f4574e9ca72c8df47fc))
* **plugintestbed:** add package ([fac9bfb](https://github.com/KnodesCommunity/typedoc-plugins/commit/fac9bfb31b40a52de790a990c7b5bc71dd354580))
* **pluginutils:** add `name` getter on plugin ([335095a](https://github.com/KnodesCommunity/typedoc-plugins/commit/335095a976ecedab7d1cbb64a2a1de0e4e5e7b79))
* **pluginutils:** add better support for modules in path reflection resolution ([ff0f7c7](https://github.com/KnodesCommunity/typedoc-plugins/commit/ff0f7c790c627a8308c00c8d5426d402657d11fa))
* **pluginutils:** add option group, add resolvePackageFile ([878baf8](https://github.com/KnodesCommunity/typedoc-plugins/commit/878baf8f713cd1f307bcde2a909ae0257d835d73))
* **pluginutils:** add package ([f6894ad](https://github.com/KnodesCommunity/typedoc-plugins/commit/f6894ad003e7f4336407238bc6dea1fd4d9c9101))
* **pluginutils:** add PathReflectionResolver, add plugin.relativeToRoot, use in MarkdownReplacer ([40eb1a1](https://github.com/KnodesCommunity/typedoc-plugins/commit/40eb1a1c2dca89cae27625f4234316166c652706))
* **pluginutils:** add rootDir on plugin, add CurrentPageMemo, add MarkdownReplacer, improve Logger ([200f52f](https://github.com/KnodesCommunity/typedoc-plugins/commit/200f52f8417865734c19ed6bc8d91128a2902abe))
* **pluginutils:** add source map support in markdown replacer ([57e5e39](https://github.com/KnodesCommunity/typedoc-plugins/commit/57e5e3925725e58677038d9b2dc9943ac42b0c96))
* **pluginutils:** fix `wrapError`, add helper `catchWrap` ([350fc9b](https://github.com/KnodesCommunity/typedoc-plugins/commit/350fc9b9281fce5b7bd7c98253af4a4ef8f66d79))



# 0.22.0 (2022-02-23)



## 0.0.1 (2022-02-23)



