'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('../core');
const path_1 = __importDefault(require('path'));
const config_1 = __importDefault(require('./config'));
const see_1 = __importDefault(require('./see'));
const creator = new core_1.Ware();
creator.use(config_1.default);
creator.use(see_1.default);
exports.default = async (options) => {
  // create context
  const context = {
    version: options.version,
    templateDir: options.template
      ? path_1.default.join(generateAbsolutePath(options.template), 'deploy')
      : core_1.config.templateDir,
    srcDir: options.src ? generateAbsolutePath(options.src) : core_1.config.srcDir,
    outputDir: options.output ? generateAbsolutePath(options.output) : core_1.config.outDir,
  };
  // running creator
  await creator.run(context);
};
function generateAbsolutePath(dir) {
  if (path_1.default.isAbsolute(dir)) {
    return dir;
  }
  return path_1.default.resolve(dir);
}
