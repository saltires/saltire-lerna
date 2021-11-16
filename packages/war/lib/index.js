'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Ware = exports.default = void 0;
var init_1 = require('./init');
Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function () {
    return __importDefault(init_1).default;
  },
});
var core_1 = require('./core');
Object.defineProperty(exports, 'Ware', {
  enumerable: true,
  get: function () {
    return core_1.Ware;
  },
});
