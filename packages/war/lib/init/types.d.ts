export interface Options {
  /**
   * Software package version
   * @default ''
   */
  version?: string;
  /**
   * Specify the directory address of the deploy template
   * @default ''
   */
  template?: string;
  /**
   * Specifies which folder to package
   * @default ''
   */
  src?: string;
  /**
   * Specify output address
   * @default ''
   */
  output?: string;
  /**
   * Specify packageVersion
   * @default ''
   */
  packageversion?: string;
  /**
   * Specify miniVersion
   * @default ''
   */
  miniversion?: string;
}

export interface Context {
  /**
   * Software package version
   * @default ''
   */
  version?: string;
  /**
   * Specify the directory address of the deploy template
   * @default ''
   */
  templateDir?: string;
  /**
   * Specifies which folder to package
   * @default ''
   */
  srcDir?: string;
  /**
   * Specify output address
   * @default ''
   */
  outputDir?: string;
  /**
   * Location of XML file in the deploy folder
   * @default ''
   */
  deployXmlTemplateDir?: string;
  /**
   * Deploy generates files (after compile)
   * @default ''
   */
  deployXmlTemplateDirTmp?: string;
  /**
   * seeConfig from package.json
   * @default ''
   */
  seeConfig?: SeeConfig;
}

export interface SeeConfig {
  /**
   * The name of the WAR file generated during the SEE release process
   */
  warName?: string;
  /**
   * Final SEE release name
   */
  zipName?: string;
  /**
   * deployVersion??
   */
  deployVersion?: string;
  /**
   * miniVersion??
   */
  miniVersion?: string;
  /**
   * packageName
   */
  packageName?: string;
  /**
   * systemType
   */
  systemType?: string;
  /**
   * appType
   */
  appType?: string;
  /**
   * appDescription
   */
  appDescription?: string;
}
