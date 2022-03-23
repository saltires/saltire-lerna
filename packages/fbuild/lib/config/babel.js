'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _default;

var _path = require('path');

function _default(opts) {
  const _opts$transform = opts.transform,
    transform = _opts$transform === void 0 ? false : _opts$transform,
    type = opts.type,
    _opts$babelOpts = opts.babelOpts,
    _opts$babelOpts$targe = _opts$babelOpts.target,
    target = _opts$babelOpts$targe === void 0 ? 'browser' : _opts$babelOpts$targe,
    typescript = _opts$babelOpts.typescript,
    runtimeHelpers = _opts$babelOpts.runtimeHelpers,
    filePath = _opts$babelOpts.filePath,
    _opts$babelOpts$brows = _opts$babelOpts.browserFiles,
    browserFiles = _opts$babelOpts$brows === void 0 ? [] : _opts$babelOpts$brows,
    nodeVersion = _opts$babelOpts.nodeVersion,
    _opts$babelOpts$nodeF = _opts$babelOpts.nodeFiles,
    nodeFiles = _opts$babelOpts$nodeF === void 0 ? [] : _opts$babelOpts$nodeF,
    lazy = _opts$babelOpts.lazy,
    _opts$babelOpts$extra = _opts$babelOpts.extraBabelPresets,
    extraBabelPresets = _opts$babelOpts$extra === void 0 ? [] : _opts$babelOpts$extra,
    _opts$babelOpts$extra2 = _opts$babelOpts.extraBabelPlugins,
    extraBabelPlugins = _opts$babelOpts$extra2 === void 0 ? [] : _opts$babelOpts$extra2;
  let isBrowser = target === 'browser'; // rollup 场景下不会传入 filePath

  if (filePath) {
    if ((0, _path.extname)(filePath) === '.tsx' || (0, _path.extname)(filePath) === '.jsx') {
      isBrowser = true;
    } else {
      if (isBrowser) {
        if (nodeFiles.includes(filePath)) isBrowser = false;
      } else {
        if (browserFiles.includes(filePath)) isBrowser = true;
      }
    }
  }

  const targets = isBrowser
    ? {
        browsers: ['last 2 versions', 'IE 10'],
      }
    : {
        node: nodeVersion || 6,
      };
  return {
    opts: {
      presets: [
        ...(typescript ? [require.resolve('@babel/preset-typescript')] : []),
        [
          require.resolve('@babel/preset-env'),
          {
            targets,
            modules: type === 'esm' ? false : 'auto',
          },
        ],
        require.resolve('@vue/babel-preset-jsx'),
        ...extraBabelPresets,
      ],
      plugins: [
        ...(transform && type === 'cjs' && lazy && !isBrowser
          ? [
              [
                require.resolve('@babel/plugin-transform-modules-commonjs'),
                {
                  lazy: true,
                },
              ],
            ]
          : []),
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve('@babel/plugin-proposal-export-default-from'),
        require.resolve('@babel/plugin-proposal-export-namespace-from'),
        require.resolve('@babel/plugin-proposal-do-expressions'),
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        [
          require.resolve('@babel/plugin-proposal-decorators'),
          {
            legacy: true,
          },
        ],
        [
          require.resolve('@babel/plugin-proposal-class-properties'),
          {
            loose: true,
          },
        ],
        [
          require.resolve('@babel/plugin-proposal-private-methods'),
          {
            loose: true,
          },
        ],
        ...(runtimeHelpers
          ? [
              [
                require.resolve('@babel/plugin-transform-runtime'),
                {
                  useESModules: isBrowser && type === 'esm',
                  version: require('@babel/runtime/package.json').version,
                },
              ],
            ]
          : []),
        ...(process.env.COVERAGE ? [require.resolve('babel-plugin-istanbul')] : []),
        ...extraBabelPlugins,
      ],
    },
    isBrowser,
  };
}
