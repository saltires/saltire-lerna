'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('../core');
const template = require('lodash.template');
const fs = require('fs');
exports.default = (state) => {
  const { seeConfig, deployXmlTemplateDir, deployXmlTemplateDirTmp } = state;
  return new Promise((resolve, reject) => {
    try {
      const xmlCompiled = template(fs.readFileSync(deployXmlTemplateDir));
      fs.writeFileSync(
        deployXmlTemplateDirTmp,
        xmlCompiled({
          seeSystemType: seeConfig.systemType,
          seeAppType: seeConfig.appType,
          seeAppName: core_1.config.packageInfo.name,
          seeAppDescription: seeConfig.appDescription,
          deployVersion: seeConfig.deployVersion,
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
