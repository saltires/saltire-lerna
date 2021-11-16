'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('../core');
const moment = require('moment');
const path_1 = __importDefault(require('path'));
const {
  packageName,
  packageVersion = '2021',
  miniVersion = '1.202101.1',
  systemType,
  appType,
  appDescription = core_1.config.packageInfo.description,
} = core_1.config.packageInfo.see;
const _stamp = moment().format('YYMMDDHHmmss');
exports.default = async (ctx) => {
  ctx.deployXmlTemplateDir = path_1.default.join(ctx.templateDir, 'deploy.xml');
  ctx.deployXmlTemplateDirTmp = path_1.default.resolve(core_1.config.paths.temp, 'deploy.xml');
  ctx.seeConfig = generateSeeConfig();
  ctx.outputDir = path_1.default.join(ctx.outputDir, ctx.seeConfig.zipName);
  function generateSeeConfig() {
    return {
      warName: `${core_1.config.packageInfo.name}-${miniVersion}.war`,
      zipName: `${packageName}V${packageVersion}-${_stamp}.zip`,
      deployVersion: packageVersion,
      packageName,
      systemType,
      appType,
      appDescription,
    };
  }
};
