'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const fs2 = require('fs-extra');
const path = require('path');
const core_1 = require('../core');
async function prepare(state) {
  const deployScriptsDir = path.resolve(state.templateDir, 'scripts');
  const deployTemplateDir = path.resolve(state.templateDir, 'template');
  const tempScriptDir = path.join(
    core_1.config.paths.temp,
    '/scripts',
    core_1.config.packageInfo.name,
  );
  const tempTemplateDir = path.join(
    core_1.config.paths.temp,
    '/template',
    core_1.config.packageInfo.name,
  );
  try {
    fs2.emptyDirSync(core_1.config.paths.temp);
    fs2.copySync(deployScriptsDir, tempScriptDir);
    fs2.copySync(deployTemplateDir, tempTemplateDir);
  } catch (error) {
    return false;
  }
  return true;
}
exports.default = prepare;
