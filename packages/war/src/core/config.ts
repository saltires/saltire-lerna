import envPaths from 'env-paths';
import path from 'path';
import { existsSync } from 'fs';
import { name } from '../../package.json';
const { cwd } = process;
let useDeployInPackage = false;
let useDeployInWorkSpace = false;

try {
  useDeployInPackage = existsSync(path.resolve(cwd(), 'node_modules/war/deploy')) ? true : false;
  useDeployInWorkSpace = existsSync(path.resolve(cwd(), 'deploy')) ? true : false;
} catch (error) {
  console.error(error);
}

export default {
  /**
   * Global system path
   */
  get paths() {
    return envPaths(name, { suffix: undefined });
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
      ? path.resolve(cwd(), 'node_modules/@ahau2019/war/deploy')
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
