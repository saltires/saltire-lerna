'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.config = exports.Ware = void 0;
var ware_1 = require('./ware');
Object.defineProperty(exports, 'Ware', {
  enumerable: true,
  get: function () {
    return ware_1.Ware;
  },
});
var config_1 = require('./config');
Object.defineProperty(exports, 'config', {
  enumerable: true,
  get: function () {
    return __importDefault(config_1).default;
  },
});
