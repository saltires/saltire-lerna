'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _default;

var _fs = require('fs');

var _path = require('path');

var _pluginUrl = _interopRequireDefault(require('@rollup/plugin-url'));

var _pluginJson = _interopRequireDefault(require('@rollup/plugin-json'));

var _pluginReplace = _interopRequireDefault(require('@rollup/plugin-replace'));

var _pluginCommonjs = _interopRequireDefault(require('@rollup/plugin-commonjs'));

var _pluginNodeResolve = _interopRequireDefault(require('@rollup/plugin-node-resolve'));

var _pluginInject = _interopRequireDefault(require('@rollup/plugin-inject'));

var _pluginBabel = _interopRequireDefault(require('@rollup/plugin-babel'));

var _rollupPluginPostcss = _interopRequireDefault(require('rollup-plugin-postcss'));

var _postcssLess = _interopRequireDefault(require('postcss-less'));

var _rollupPluginTerser = require('rollup-plugin-terser');

var _rollupPluginTypescript = _interopRequireDefault(require('rollup-plugin-typescript2'));

var _lodash = require('lodash');

var _tempDir = _interopRequireDefault(require('temp-dir'));

var _autoprefixer = _interopRequireDefault(require('autoprefixer'));

var _lessPluginNpmImport = _interopRequireDefault(require('less-plugin-npm-import'));

var _rollup = _interopRequireDefault(require('@svgr/rollup'));

var _rollupPluginVue = _interopRequireDefault(require('rollup-plugin-vue'));

var _babel = _interopRequireDefault(require('./babel'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _default(opts) {
  const cwd = opts.cwd,
    rootPath = opts.rootPath,
    type = opts.type,
    disableTypeCheck = opts.disableTypeCheck,
    babelOpts = opts.babelOpts,
    _opts$babelOpts = opts.babelOpts,
    _opts$babelOpts$targe = _opts$babelOpts.target,
    target = _opts$babelOpts$targe === void 0 ? 'browser' : _opts$babelOpts$targe,
    runtimeHelpersOpts = _opts$babelOpts.runtimeHelpers,
    _opts$babelOpts$babel = _opts$babelOpts.babelExclude,
    babelExclude = _opts$babelOpts$babel === void 0 ? /\/node_modules\// : _opts$babelOpts$babel,
    _opts$rollupOpts = opts.rollupOpts,
    entry = _opts$rollupOpts.entry,
    file = _opts$rollupOpts.file,
    _opts$rollupOpts$extr = _opts$rollupOpts.extractCSS,
    extractCSS = _opts$rollupOpts$extr === void 0 ? false : _opts$rollupOpts$extr,
    _opts$rollupOpts$inje = _opts$rollupOpts.injectCSS,
    injectCSS = _opts$rollupOpts$inje === void 0 ? true : _opts$rollupOpts$inje,
    modules = _opts$rollupOpts.cssModules,
    _opts$rollupOpts$extr2 = _opts$rollupOpts.extraPostCSSPlugins,
    extraPostCSSPlugins = _opts$rollupOpts$extr2 === void 0 ? [] : _opts$rollupOpts$extr2,
    _opts$rollupOpts$extr3 = _opts$rollupOpts.extraRollupPlugins,
    extraRollupPlugins = _opts$rollupOpts$extr3 === void 0 ? [] : _opts$rollupOpts$extr3,
    autoprefixerOpts = _opts$rollupOpts.autoprefixer,
    replaceOpts = _opts$rollupOpts.replace,
    injectOpts = _opts$rollupOpts.inject,
    _opts$rollupOpts$extr4 = _opts$rollupOpts.extraExternals,
    extraExternals = _opts$rollupOpts$extr4 === void 0 ? [] : _opts$rollupOpts$extr4,
    _opts$rollupOpts$exte = _opts$rollupOpts.externalsExclude,
    externalsExclude = _opts$rollupOpts$exte === void 0 ? [] : _opts$rollupOpts$exte,
    typescriptOpts = _opts$rollupOpts.typescriptOpts,
    _opts$rollupOpts$node = _opts$rollupOpts.nodeResolveOpts,
    nodeResolveOpts = _opts$rollupOpts$node === void 0 ? {} : _opts$rollupOpts$node,
    _opts$rollupOpts$mini = _opts$rollupOpts.minify,
    minify = _opts$rollupOpts$mini === void 0 ? false : _opts$rollupOpts$mini,
    umd = _opts$rollupOpts.umd;
  const entryExt = (0, _path.extname)(entry);
  const name = file || (0, _path.basename)(entry, entryExt);
  const isTypeScript = entryExt === '.ts' || entryExt === '.tsx';
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];
  let pkg = {};

  try {
    pkg = require((0, _path.join)(cwd, 'package.json'));
  } catch (e) {} // cjs 不给浏览器用，所以无需 runtimeHelpers

  const runtimeHelpers = type === 'cjs' ? false : runtimeHelpersOpts;

  const babelConfig = _objectSpread(
    _objectSpread(
      {},
      (0, _babel.default)({
        type,
        babelOpts: _objectSpread(
          _objectSpread({}, babelOpts),
          {},
          {
            target: type === 'esm' ? 'browser' : target,
            // watch 模式下有几率走的 babel？原因未知。
            // ref: https://github.com/umijs/father/issues/158
            typescript: true,
          },
        ),
      }).opts,
    ),
    {},
    {
      // ref: https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
      babelHelpers: runtimeHelpers ? 'runtime' : 'bundled',
      exclude: babelExclude,
      babelrc: false,
      // ref: https://github.com/rollup/rollup-plugin-babel#usage
      extensions,
    },
  ); // rollup configs

  const input = (0, _path.join)(cwd, entry);
  const format = type; // ref: https://rollupjs.org/guide/en#external
  // 潜在问题：引用包的子文件时会报 warning，比如 @babel/runtime/helpers/esm/createClass
  // 解决方案：可以用 function 处理

  extraExternals.push('vue');
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...extraExternals,
  ]; // umd 只要 external peerDependencies

  const externalPeerDeps = [...Object.keys(pkg.peerDependencies || {}), ...extraExternals]; // UMD shared settings: output.globals
  // Refer to https://rollupjs.org/guide/en#output-globals for details

  const globals = {
    // Provide global variable names to replace your external imports
    // eg. jquery: '$'
    vue: 'Vue',
  };

  function getPkgNameByid(id) {
    const splitted = id.split('/'); // @ 和 @tmp 是为了兼容 umi 的逻辑

    if (id.charAt(0) === '@' && splitted[0] !== '@' && splitted[0] !== '@tmp') {
      return splitted.slice(0, 2).join('/');
    } else {
      return id.split('/')[0];
    }
  }

  function testExternal(pkgs, excludes, id) {
    if (excludes.includes(id)) {
      return false;
    }

    return pkgs.includes(getPkgNameByid(id));
  }

  const terserOpts = {
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  };

  function getPlugins(opts = {}) {
    const minCSS = opts.minCSS,
      isUMD = opts.isUMD;
    const postcssPlugins = [
      (0, _autoprefixer.default)(
        _objectSpread(
          {
            // https://github.com/postcss/autoprefixer/issues/776
            remove: false,
          },
          autoprefixerOpts,
        ),
      ),
      ...extraPostCSSPlugins,
    ];

    const postcssConfigList = _objectSpread(
      _objectSpread(
        {
          extract: extractCSS,
          inject: injectCSS,
          modules,
        },
        modules
          ? {
              autoModules: false,
            }
          : {},
      ),
      {},
      {
        minimize: !!minCSS,
        // syntax,
        use: {
          less: {
            plugins: [
              new _lessPluginNpmImport.default({
                prefix: '~',
              }),
            ],
            javascriptEnabled: true,
          },
        },
        plugins: postcssPlugins,
      },
    );

    return [
      (0, _rollupPluginVue.default)({
        css: extractCSS,
        // https://rollup-plugin-vue.vuejs.org/options.html#style-postcssoptions
        // the question is style.postcssOptions not working, but postcssOptions work.
        postcssOptions: {
          syntax: _postcssLess.default,
        },
        postcssPlugins: postcssPlugins,
      }),
      (0, _pluginUrl.default)(),
      (0, _rollup.default)(),
      (0, _rollupPluginPostcss.default)(postcssConfigList),
      ...(injectOpts ? [(0, _pluginInject.default)(injectOpts)] : []),
      ...(replaceOpts && !(0, _lodash.isEmpty)(replaceOpts)
        ? [
            (0, _pluginReplace.default)(
              _objectSpread(
                {
                  preventAssignment: true,
                },
                replaceOpts,
              ),
            ),
          ]
        : []),
      (0, _pluginNodeResolve.default)(
        _objectSpread(
          {
            mainFields: ['module', 'jsnext:main', 'main'],
            extensions,
          },
          nodeResolveOpts,
        ),
      ),
      ...(isUMD
        ? [
            (0, _pluginCommonjs.default)({
              include: /node_modules/,
            }),
          ]
        : []),
      ...(isTypeScript
        ? [
            (0, _rollupPluginTypescript.default)(
              _objectSpread(
                {
                  cwd,
                  // @see https://github.com/umijs/father/issues/61#issuecomment-544822774
                  clean: true,
                  cacheRoot: `${_tempDir.default}/.rollup_plugin_typescript2_cache`,
                  // 支持往上找 tsconfig.json
                  // 比如 lerna 的场景不需要每个 package 有个 tsconfig.json
                  tsconfig: [
                    (0, _path.join)(cwd, 'tsconfig.json'),
                    (0, _path.join)(rootPath, 'tsconfig.json'),
                  ].find(_fs.existsSync),
                  tsconfigDefaults: {
                    compilerOptions: {
                      // Generate declaration files by default
                      declaration: true,
                    },
                  },
                  tsconfigOverride: {
                    compilerOptions: {
                      // Support dynamic import
                      target: 'esnext',
                    },
                  },
                  check: !disableTypeCheck,
                },
                typescriptOpts || {},
              ),
            ),
          ]
        : []),
      (0, _pluginBabel.default)(babelConfig),
      (0, _pluginJson.default)(),
      ...(extraRollupPlugins || []),
    ];
  }

  switch (type) {
    case 'esm':
      return [
        {
          input,
          output: {
            format,
            file: (0, _path.join)(cwd, `dist/${name}.esm.js`),
            exports: 'named',
          },
          plugins: [
            ...getPlugins(),
            ...(minify ? [(0, _rollupPluginTerser.terser)(terserOpts)] : []),
          ],
          external: testExternal.bind(null, external, externalsExclude),
        },
      ];

    case 'cjs':
      return [
        {
          input,
          output: {
            format,
            file: (0, _path.join)(cwd, `dist/${name}.js`),
            exports: 'named',
          },
          plugins: [
            ...getPlugins(),
            ...(minify ? [(0, _rollupPluginTerser.terser)(terserOpts)] : []),
          ],
          external: testExternal.bind(null, external, externalsExclude),
        },
      ];

    case 'umd':
      return [
        {
          input,
          output: {
            format,
            sourcemap: umd && umd.sourcemap,
            file: (0, _path.join)(cwd, `dist/${name}.umd.js`),
            globals: umd && _objectSpread(_objectSpread({}, umd.globals), globals),
            name:
              (umd && umd.name) ||
              (pkg.name && (0, _lodash.camelCase)((0, _path.basename)(pkg.name))),
            exports: 'named',
          },
          plugins: [
            ...getPlugins({
              isUMD: true,
            }),
            (0, _pluginReplace.default)({
              preventAssignment: true,
              values: {
                'process.env.NODE_ENV': JSON.stringify('development'),
              },
            }),
          ],
          external: testExternal.bind(null, externalPeerDeps, externalsExclude),
        },
        {
          input,
          output: {
            format,
            sourcemap: umd && umd.sourcemap,
            file: (0, _path.join)(cwd, `dist/${name}.umd.min.js`),
            globals: umd && _objectSpread(_objectSpread({}, umd.globals), globals),
            name:
              (umd && umd.name) ||
              (pkg.name && (0, _lodash.camelCase)((0, _path.basename)(pkg.name))),
            exports: 'named',
          },
          plugins: [
            ...getPlugins({
              minCSS: true,
              isUMD: true,
            }),
            (0, _pluginReplace.default)({
              preventAssignment: true,
              values: {
                'process.env.NODE_ENV': JSON.stringify('production'),
              },
            }),
            (0, _rollupPluginTerser.terser)(terserOpts),
          ],
          external: testExternal.bind(null, externalPeerDeps, externalsExclude),
        },
      ];

    default:
      throw new Error(`Unsupported type ${type}`);
  }
}
