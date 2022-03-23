'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.CONFIG_FILES = void 0;
exports.getConfig = getConfig;
exports.validateConfig = validateConfig;

var _fs = require('fs');

var _path = require('path');

var _lodash = require('lodash');

var _utils = require('../utils');

var assert = _interopRequireWildcard(require('assert'));

var _ajv = _interopRequireDefault(require('ajv'));

var _chalk = _interopRequireDefault(require('chalk'));

var _babel = _interopRequireDefault(require('./babel'));

var _schema = _interopRequireDefault(require('./schema'));

var _signale = _interopRequireDefault(require('signale'));

var _slash = _interopRequireDefault(require('slash2'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
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

function isTypescriptFile(filePath) {
  return filePath.endsWith('.ts') || filePath.endsWith('.tsx');
}

function testDefault(obj) {
  return obj.default || obj;
} // automatically compile files on the fly

function registerBabel(cwd, only) {
  const _getBabelConfig = (0, _babel.default)({
      babelOpts: {
        target: 'node',
        typescript: true,
      },
    }),
    babelConfig = _getBabelConfig.opts;

  require('@babel/register')(
    _objectSpread(
      _objectSpread({}, babelConfig),
      {},
      {
        extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
        only: only.map((file) => (0, _slash.default)((0, _path.join)(cwd, file))),
        babelrc: false,
        cache: false,
      },
    ),
  );
}

const CONFIG_FILES = ['.fbuildrc.js', '.fbuildrc.jsx', '.fbuildrc.ts', '.fbuildrc.tsx']; // TODO

exports.CONFIG_FILES = CONFIG_FILES;
const CLASSES = {
  Function: Function,
};

const extendAjv = (ajv) => {
  ajv.addKeyword('instanceof', {
    compile: function compile(schema) {
      var Class = CLASSES[schema];
      return function (data) {
        return data instanceof Class;
      };
    },
  });
  return ajv;
};

function getUserConfig({ cwd }) {
  const configFile = (0, _utils.getExistFile)({
    cwd,
    files: CONFIG_FILES,
    returnRelative: false,
  });

  if (configFile) {
    registerBabel(cwd, CONFIG_FILES);
    const userConfig = testDefault(require(configFile));
    const userConfigs = (0, _lodash.isArray)(userConfig) ? userConfig : [userConfig];
    userConfigs.forEach((userConfig) => {
      const ajv = extendAjv(
        new _ajv.default({
          allErrors: true,
        }),
      );
      const isValid = ajv.validate(_schema.default, userConfig);

      if (!isValid) {
        const errors = ajv.errors.map(({ dataPath, message }, index) => {
          return `${index + 1}. ${dataPath}${dataPath ? ' ' : ''}${message}`;
        });
        throw new Error(
          `
Invalid options in ${(0, _slash.default)((0, _path.relative)(cwd, configFile))}

${errors.join('\n')}
`.trim(),
        );
      }
    });
    return userConfig;
  } else {
    return {};
  }
}

function getConfig(opts) {
  const cwd = opts.cwd,
    _opts$rootConfig = opts.rootConfig,
    rootConfig = _opts$rootConfig === void 0 ? {} : _opts$rootConfig;
  const defaultEntry = (0, _utils.getExistFile)({
    cwd,
    files: ['src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js'],
    returnRelative: true,
  });
  const userConfig = getUserConfig({
    cwd,
  });
  const userConfigs = (0, _lodash.isArray)(userConfig) ? userConfig : [userConfig];
  return userConfigs.map((userConfig) => {
    const _merge = (0, _lodash.merge)(
        {
          entry: defaultEntry,
        },
        rootConfig,
        userConfig,
      ),
      watch = _merge.watch,
      entry = _merge.entry,
      file = _merge.file,
      type = _merge.type,
      transform = _merge.transform,
      transformType = _merge.transformType,
      disableTypeCheck = _merge.disableTypeCheck,
      _merge$target = _merge.target,
      target = _merge$target === void 0 ? 'browser' : _merge$target,
      runtimeHelpers = _merge.runtimeHelpers,
      _merge$browserFiles = _merge.browserFiles,
      browserFiles = _merge$browserFiles === void 0 ? [] : _merge$browserFiles,
      nodeVersion = _merge.nodeVersion,
      _merge$nodeFiles = _merge.nodeFiles,
      nodeFiles = _merge$nodeFiles === void 0 ? [] : _merge$nodeFiles,
      lazy = _merge.lazy,
      _merge$babelExclude = _merge.babelExclude,
      babelExclude = _merge$babelExclude === void 0 ? /\/node_modules\// : _merge$babelExclude,
      _merge$extraBabelPres = _merge.extraBabelPresets,
      extraBabelPresets = _merge$extraBabelPres === void 0 ? [] : _merge$extraBabelPres,
      _merge$extraBabelPlug = _merge.extraBabelPlugins,
      extraBabelPlugins = _merge$extraBabelPlug === void 0 ? [] : _merge$extraBabelPlug,
      _merge$extractCSS = _merge.extractCSS,
      extractCSS = _merge$extractCSS === void 0 ? false : _merge$extractCSS,
      _merge$injectCSS = _merge.injectCSS,
      injectCSS = _merge$injectCSS === void 0 ? true : _merge$injectCSS,
      cssModules = _merge.cssModules,
      _merge$extraPostCSSPl = _merge.extraPostCSSPlugins,
      extraPostCSSPlugins = _merge$extraPostCSSPl === void 0 ? [] : _merge$extraPostCSSPl,
      _merge$extraRollupPlu = _merge.extraRollupPlugins,
      extraRollupPlugins = _merge$extraRollupPlu === void 0 ? [] : _merge$extraRollupPlu,
      autoprefixer = _merge.autoprefixer,
      replace = _merge.replace,
      inject = _merge.inject,
      _merge$extraExternals = _merge.extraExternals,
      extraExternals = _merge$extraExternals === void 0 ? [] : _merge$extraExternals,
      _merge$externalsExclu = _merge.externalsExclude,
      externalsExclude = _merge$externalsExclu === void 0 ? [] : _merge$externalsExclu,
      typescriptOpts = _merge.typescriptOpts,
      _merge$nodeResolveOpt = _merge.nodeResolveOpts,
      nodeResolveOpts = _merge$nodeResolveOpt === void 0 ? {} : _merge$nodeResolveOpt,
      _merge$minify = _merge.minify,
      minify = _merge$minify === void 0 ? false : _merge$minify,
      umd = _merge.umd;

    return {
      watch,
      type,
      transform,
      transformType,
      disableTypeCheck,
      babelOpts: {
        target,
        runtimeHelpers,
        browserFiles,
        nodeVersion,
        nodeFiles,
        lazy,
        babelExclude,
        extraBabelPresets,
        extraBabelPlugins,
      },
      rollupOpts: {
        entry,
        file,
        extractCSS,
        injectCSS,
        cssModules,
        extraPostCSSPlugins,
        extraRollupPlugins,
        autoprefixer,
        replace,
        inject,
        extraExternals,
        externalsExclude,
        typescriptOpts,
        nodeResolveOpts,
        minify,
        umd,
      },
    };
  });
}

function validateConfig(opts, { cwd, rootPath }) {
  var _opts$type;

  if (opts.babelOpts.runtimeHelpers) {
    const pkgPath = (0, _path.join)(cwd, 'package.json');
    assert.ok(
      (0, _fs.existsSync)(pkgPath),
      `@babel/runtime dependency is required to use runtimeHelpers`,
    );
    const pkg = JSON.parse((0, _fs.readFileSync)(pkgPath, 'utf-8'));
    assert.ok(
      (pkg.dependencies || {})['@babel/runtime'],
      `@babel/runtime dependency is required to use runtimeHelpers`,
    );
  }

  if (opts.babelOpts.lazy) {
    _signale.default.info(`Option lazy is only working for cjs transform task.`);
  }

  if (
    opts.transform &&
    !opts.transformType &&
    (opts.type === 'umd' ||
      ((_opts$type = opts.type) !== null && _opts$type !== void 0 && _opts$type.includes('umd')))
  ) {
    throw new Error('Format umd is only working for build task.');
  }

  if (opts.rollupOpts.entry) {
    const tsConfigPath = (0, _path.join)(cwd, 'tsconfig.json');
    const tsConfig =
      (0, _fs.existsSync)(tsConfigPath) ||
      (rootPath && (0, _fs.existsSync)((0, _path.join)(rootPath, 'tsconfig.json')));

    if (!tsConfig && isTypescriptFile(opts.rollupOpts.entry)) {
      _signale.default.info(
        `Project using ${_chalk.default.cyan(
          'typescript',
        )} but tsconfig.json not exists. Use default config.`,
      );
    }
  }
}
