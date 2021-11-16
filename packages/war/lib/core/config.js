'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const env_paths_1 = __importDefault(require('env-paths'));
const path_1 = __importDefault(require('path'));
const fs_1 = require('fs');
const package_json_1 = require('../../package.json');
const { cwd } = process;
let useDeployInPackage = false;
let useDeployInWorkSpace = false;
try {
  useDeployInPackage = (0, fs_1.existsSync)(
    path_1.default.resolve(cwd(), 'node_modules/war/deploy'),
  )
    ? true
    : false;
  useDeployInWorkSpace = (0, fs_1.existsSync)(path_1.default.resolve(cwd(), 'deploy'))
    ? true
    : false;
} catch (error) {
  console.error(error);
}
exports.default = {
  /**
   * Global system path
   */
  get paths() {
    return (0, env_paths_1.default)(package_json_1.name, { suffix: undefined });
  },
  /**
   * Directory of the folder to be packed
   */
  get srcDir() {
    return path_1.default.resolve(cwd(), 'dist');
  },
  /**
   * The output directory
   */
  get outDir() {
    return path_1.default.resolve(cwd());
  },
  /**
   * Deploy template catalog
   */
  get templateDir() {
    return useDeployInPackage
      ? path_1.default.resolve(cwd(), 'node_modules/@ahau2019/war/deploy')
      : useDeployInWorkSpace
      ? path_1.default.resolve(cwd(), 'deploy')
      : '';
  },
  /**
   * package.json informations
   */
  get packageInfo() {
    return require(path_1.default.resolve(cwd(), 'package.json'));
  },
};
