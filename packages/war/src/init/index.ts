import { Ware, config } from '../core';
import { Options, Context } from './types';
import path from 'path';
import configFn from './config';
import seeFn, { PackDir } from './see';

const creator = new Ware<Context>();

creator.use(configFn);
creator.use(seeFn);

export default async (options: Options) => {
  // create context
  const context: Context = {
    version: options.version,
    templateDir: options.template
      ? path.join(generateAbsolutePath(options.template), 'deploy')
      : config.templateDir,
    srcDir: options.src ? generateAbsolutePath(options.src) : config.srcDir,
    outputDir: options.output ? generateAbsolutePath(options.output) : config.outDir,
  };

  // running creator
  await creator.run(context);
};

function generateAbsolutePath(dir: string): string {
  if (path.isAbsolute(dir)) {
    return dir;
  }

  return path.resolve(dir);
}

export { Options, Context, PackDir };
