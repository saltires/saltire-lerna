import { Context } from './types';
import { config } from '../core';
const template = require('lodash.template');
const fs = require('fs');

export default (state: Context) => {
  const { seeConfig, deployXmlTemplateDir, deployXmlTemplateDirTmp } = state;

  return new Promise((resolve, reject) => {
    try {
      const xmlCompiled = template(fs.readFileSync(deployXmlTemplateDir));
      fs.writeFileSync(
        deployXmlTemplateDirTmp,
        xmlCompiled({
          seeSystemType: seeConfig!.systemType,
          seeAppType: seeConfig!.appType,
          seeAppName: config.packageInfo.cliName,
          seeAppDescription: seeConfig!.appDescription,
          deployVersion: seeConfig!.deployVersion,
          variables: '',
        }),
        {
          encoding: 'utf-8',
        },
      );
    } catch (error) {
      reject(error);
    }
    resolve(true);
  });
};
