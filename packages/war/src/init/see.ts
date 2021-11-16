const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');
import { Context } from './types';
import { config } from '../core';
import prepare from './prepare';
import packToWar from './packToWar';
import compileXML from './compileXML';
import packager from '../util';

export interface PackDir {
  source: string;
  destination: string;
}

/**
 * After all sub-applications are packaged, see releases are made
 * @param {object}} state
 */
export default async function (state: Context) {
  const spinner = ora(`${warning('Start making SEE issued production\n')}`).start();

  try {
    await prepare(state);

    await packToWar(state);

    await compileXML(state);

    await pack(state);

    shell.rm('-rf', config.paths.temp);
  } catch (error) {
    spinner.fail(`Release creation failed:${error}`);
  }

  spinner.succeed(`${success(` The see release is complete!`)}`);
  spinner.stop();
}

async function pack(state: Context) {
  const { seeConfig, outputDir } = state;

  return await packager({
    source: config.paths.temp,
    destination: outputDir!,
  });
}
