'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.build = build;
exports.default = _default;

var _fs = require('fs');

var _path = require('path');

var _config = require('./config');

var _project = require('@lerna/project');

var _packageGraph = require('@lerna/package-graph');

var assert = _interopRequireWildcard(require('assert'));

var _build2 = _interopRequireDefault(require('./build'));

var _transform = _interopRequireDefault(require('./transform'));

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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
        e: function e(_e2) {
          throw _e2;
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
    e: function e(_e3) {
      didErr = true;
      err = _e3;
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

/**
 * TODO
 *  - esbuild
 */
const dispose = [];

function build(_x) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function* (opts) {
    const cwd = opts.cwd || process.cwd();
    const userConfigs = (0, _config.getConfig)({
      cwd,
    });

    var _iterator = _createForOfIteratorHelper(userConfigs),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        let userConfig = _step.value;
        (0, _config.validateConfig)(userConfig, {
          cwd,
        });
        userConfig = _objectSpread(
          _objectSpread(_objectSpread({}, userConfig), opts),
          {},
          {
            cwd,
            dispose,
          },
        );

        if (userConfig.transform) {
          yield (0, _transform.default)(userConfig);
        }

        if (userConfig.type) {
          yield (0, _build2.default)(userConfig);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  return _build.apply(this, arguments);
}

function _default(_x2) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* (args) {
    const cwd = process.cwd();
    const isLerna = (0, _fs.existsSync)((0, _path.join)(cwd, 'lerna.json'));

    if (isLerna) {
      // 参考 https://github.com/lerna/lerna/blob/main/utils/symlink-dependencies/symlink-dependencies.js
      const packages = yield (0, _project.getPackages)(cwd);
      const packageGraph = new _packageGraph.PackageGraph(packages, 'allDependencies');
      const cacheNodes = []; // build lerna package recursively

      const buildNode = /*#__PURE__*/ (function () {
        var _ref2 = _asyncToGenerator(function* (node) {
          if (node.localDependencies.size) {
            var _iterator2 = _createForOfIteratorHelper(node.localDependencies),
              _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                const _step2$value = _slicedToArray(_step2.value, 2),
                  dependencyName = _step2$value[0],
                  resolved = _step2$value[1];

                if (resolved.type === 'directory') {
                  // a local file: specifier is already a symlink
                  continue;
                }

                const dependencyNode = packageGraph.get(dependencyName);
                yield buildNode(dependencyNode);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          } // get PackageGraphNode of dependency

          const dependencyName = node.name;
          const dependencyNode = packageGraph.get(dependencyName);
          const dependencyLocation = dependencyNode.pkg.contents
            ? (0, _path.resolve)(dependencyNode.location, dependencyNode.pkg.contents)
            : dependencyNode.location;
          if (cacheNodes.includes(dependencyName)) return;
          cacheNodes.push(dependencyName);
          assert.ok(
            (0, _fs.existsSync)((0, _path.join)(dependencyLocation, 'package.json')),
            `package.json not found in ${dependencyName}`,
          );
          process.chdir(dependencyLocation);
          yield build(
            _objectSpread(
              _objectSpread({}, args),
              {},
              {
                cwd: dependencyLocation,
                rootPath: cwd,
              },
            ),
          );
        });

        return function buildNode(_x3) {
          return _ref2.apply(this, arguments);
        };
      })();

      var _iterator3 = _createForOfIteratorHelper(packageGraph.values()),
        _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          const node = _step3.value;
          if (cacheNodes.includes(node.name)) continue;
          yield buildNode(node);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } else {
      yield build(
        _objectSpread(
          _objectSpread({}, args),
          {},
          {
            cwd,
          },
        ),
      );
    }

    return () => dispose.forEach((e) => e());
  });
  return _ref.apply(this, arguments);
}
