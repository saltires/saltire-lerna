'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const commander_1 = require('commander');
const _1 = __importDefault(require('.'));
const package_json_1 = require('../package.json');
const program = new commander_1.Command();
program
  .version(package_json_1.version)
  .description('Compresses a specified directory into a war file')
  .option('-t, --template <templatepath>', 'Specify the directory address of the deploy template')
  .option('-s, --src <srcpath>', 'Specifies which folder to package')
  .option('-o, --output <outpath>', 'Specify output address')
  .option('-p, --packageversion <packageversion>', 'Specify packageVersion')
  .option('-m, --miniversion <miniversion>', 'Specify miniVersion');
program.parse(process.argv);
const options = program.opts();
(0, _1.default)(options);
