'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');
const core_1 = require('../core');
const prepare_1 = __importDefault(require('./prepare'));
const packToWar_1 = __importDefault(require('./packToWar'));
const compileXML_1 = __importDefault(require('./compileXML'));
const util_1 = __importDefault(require('../util'));
/**
 * After all sub-applications are packaged, see releases are made
 * @param {object}} state
 */
async function default_1(state) {
  const spinner = ora(`${warning('Start making SEE issued production\n')}`).start();
  try {
    await (0, prepare_1.default)(state);
    await (0, packToWar_1.default)(state);
    await (0, compileXML_1.default)(state);
    await pack(state);
    shell.rm('-rf', core_1.config.paths.temp);
  } catch (error) {
    spinner.fail(`Release creation failed:${error}`);
  }
  spinner.succeed(`${success(` The see release is complete!`)}`);
  spinner.stop();
}
exports.default = default_1;
async function pack(state) {
  const { seeConfig, outputDir } = state;
  return await (0, util_1.default)({
    source: core_1.config.paths.temp,
    destination: outputDir,
  });
}
