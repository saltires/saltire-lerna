'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path = require('path');
const core_1 = require('../core');
const util_1 = __importDefault(require('../util'));
exports.default = async (state) => {
  const { seeConfig, srcDir } = state;
  return await (0, util_1.default)({
    source: srcDir,
    destination: path.join(core_1.config.paths.temp, seeConfig.warName),
  });
};
