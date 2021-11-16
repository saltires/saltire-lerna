const fs2 = require('fs-extra');
const path = require('path');
import { config } from '../core';
import { Context } from './types';

export default async function prepare(state: Context) {
  const deployScriptsDir = path.resolve(state.templateDir, 'scripts');
  const deployTemplateDir = path.resolve(state.templateDir, 'template');
  const tempScriptDir = path.join(config.paths.temp, '/scripts', config.packageInfo.cliName);
  const tempTemplateDir = path.join(config.paths.temp, '/template', config.packageInfo.cliName);

  try {
    fs2.emptyDirSync(config.paths.temp);
    fs2.copySync(deployScriptsDir, tempScriptDir);
    fs2.copySync(deployTemplateDir, tempTemplateDir);
  } catch (error) {
    return false;
  }

  return true;
}
