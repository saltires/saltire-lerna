'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = _default;

var _path = require('path');

var _rollup = require('rollup');

var _rollup2 = _interopRequireDefault(require('./config/rollup'));

var _chalk = _interopRequireDefault(require('chalk'));

var _log = _interopRequireDefault(require('./utils/log'));

var _rimraf = _interopRequireDefault(require('rimraf'));

var _signale = _interopRequireDefault(require('signale'));

var _lodash = require('lodash');

const _excluded = ['output'];

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
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

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* (opts) {
    const cwd = opts.cwd,
      rootPath = opts.rootPath,
      type = opts.type,
      watch = opts.watch,
      dispose = opts.dispose,
      disableTypeCheck = opts.disableTypeCheck,
      babelOpts = opts.babelOpts,
      rollupOpts = opts.rollupOpts;
    const buildTypes = (0, _lodash.isArray)(type) ? type : [type];

    var _iterator = _createForOfIteratorHelper(buildTypes),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        const buildType = _step.value;
        const rollupConfigs = (0, _rollup2.default)({
          cwd,
          rootPath: rootPath || cwd,
          type: buildType,
          disableTypeCheck,
          babelOpts,
          rollupOpts,
        });

        var _iterator2 = _createForOfIteratorHelper(rollupConfigs),
          _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var _rollupConfig$output, _rollupConfig$output2;

            const rollupConfig = _step2.value;
            // Clean dist file
            (0, _log.default)(
              _chalk.default.gray(
                `Clean file ${
                  rollupConfig === null || rollupConfig === void 0
                    ? void 0
                    : (_rollupConfig$output = rollupConfig.output) === null ||
                      _rollupConfig$output === void 0
                    ? void 0
                    : _rollupConfig$output.file
                }`,
              ),
            );

            _rimraf.default.sync(
              rollupConfig === null || rollupConfig === void 0
                ? void 0
                : (_rollupConfig$output2 = rollupConfig.output) === null ||
                  _rollupConfig$output2 === void 0
                ? void 0
                : _rollupConfig$output2.file,
            );

            if (watch) {
              const watcher = (0, _rollup.watch)([
                _objectSpread(
                  _objectSpread({}, rollupConfig),
                  {},
                  {
                    watch: {},
                  },
                ),
              ]);
              watcher.on('event', (event) => {
                if (event.error) {
                  _signale.default.error(event.error);
                } else if (event.code === 'START') {
                  (0, _log.default)(`[${buildType}] Rebuild since file changed`);
                }
              });
              process.once('SIGINT', () => {
                watcher.close();
              });
              dispose === null || dispose === void 0 ? void 0 : dispose.push(() => watcher.close());
            } else {
              const output = rollupConfig.output,
                input = _objectWithoutProperties(rollupConfig, _excluded);

              const bundle = yield (0, _rollup.rollup)(input);
              yield bundle.write(output);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  return _ref.apply(this, arguments);
}
