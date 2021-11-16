import { Context, SeeConfig } from './types';
import { config } from '../core';
const moment = require('moment');
import path from 'path';
const {
  packageName,
  packageVersion = '2021',
  miniVersion = '1.202101.1',
  systemType,
  appType,
  appDescription = config.packageInfo.description,
} = config.packageInfo.see;
const _stamp = moment().format('YYMMDDHHmmss');

export default async (ctx: Context) => {
  ctx.deployXmlTemplateDir = path.join(ctx.templateDir!, 'deploy.xml');
  ctx.deployXmlTemplateDirTmp = path.resolve(config.paths.temp, 'deploy.xml');
  ctx.seeConfig = generateSeeConfig();
  ctx.outputDir = path.join(ctx.outputDir!, ctx.seeConfig!.zipName!);

  function generateSeeConfig(): SeeConfig {
    return {
      warName: `${config.packageInfo.name}-${miniVersion}.war`,
      zipName: `${packageName}V${packageVersion}-${_stamp}.zip`,
      deployVersion: packageVersion,
      packageName,
      systemType,
      appType,
      appDescription,
    };
  }
};
