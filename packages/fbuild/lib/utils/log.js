'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = log;

var _randomColor = _interopRequireDefault(require('./randomColor'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function log(msg, pkg) {
  const pkgName =
    (typeof pkg === 'string' ? pkg : pkg === null || pkg === void 0 ? void 0 : pkg.name) ||
    'unknown';
  console.log(`${pkg ? `${(0, _randomColor.default)(`${pkgName}`)}: ` : ''}${msg}`);
}
