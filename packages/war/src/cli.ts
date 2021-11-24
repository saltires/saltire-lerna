import { Command } from 'commander';
import init from '.';
import { cliName as name, version } from '../package.json';

const program = new Command();

program
  .version(version)
  .description('Compresses a specified directory into a war file')
  .option('-t, --template <templatepath>', 'Specify the directory address of the deploy template')
  .option('-s, --src <srcpath>', 'Specifies which folder to package')
  .option('-o, --output <outpath>', 'Specify output address')
  .option('-p, --packageversion <packageversion>', 'Specify packageVersion')
  .option('-m, --miniversion <miniversion>', 'Specify miniVersion');

program.parse(process.argv);

const options = program.opts();

init(options);
