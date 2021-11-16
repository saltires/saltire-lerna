const path = require('path');
import { Context } from './types';
import { config } from '../core';
import packager from '../util';

export default async (state: Context) => {
  const { seeConfig, srcDir } = state;

  return await packager({
    source: srcDir!,
    destination: path.join(config.paths.temp, seeConfig!.warName),
  });
};
