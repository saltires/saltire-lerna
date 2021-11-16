import envPaths from 'env-paths';
declare const _default: {
  /**
   * Global system path
   */
  readonly paths: envPaths.Paths;
  /**
   * Directory of the folder to be packed
   */
  readonly srcDir: string;
  /**
   * The output directory
   */
  readonly outDir: string;
  /**
   * Deploy template catalog
   */
  readonly templateDir: string;
  /**
   * package.json informations
   */
  readonly packageInfo: any;
};
export default _default;
