import envPaths from 'env-paths';
import path from 'path';
import { existsSync } from 'fs';
import { cliName } from '../../package.json';
const { cwd } = process;
const useDeployInPackage = existsSync(path.resolve(cwd(), 'node_modules/war/deploy'))
  ? true
  : false;
const useDeployInWorkSpace = existsSync(path.resolve(cwd(), 'deploy')) ? true : false;

export default {
  /**
   * Global system path
   */
  get paths() {
    return envPaths(cliName, { suffix: undefined });
  },
  /**
   * Directory of the folder to be packed
   */
  get srcDir() {
    return path.resolve(cwd(), 'dist');
  },
  /**
   * The output directory
   */
  get outDir() {
    return path.resolve(cwd());
  },
  /**
   * Deploy template catalog
   */
  get templateDir() {
    return useDeployInPackage
      ? path.resolve(cwd(), 'node_modules/war/deploy')
      : useDeployInWorkSpace
      ? path.resolve(cwd(), 'deploy')
      : '';
  },
  /**
   * package.json informations
   */
  get packageInfo() {
    return require(path.resolve(cwd(), 'package.json'));
  },
};
