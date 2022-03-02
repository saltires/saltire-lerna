import chalk, { Chalk } from 'chalk';

const colors = [
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'gray',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
];

let index = 0;
const cache: { [prop: string]: Chalk } = {};

export default (pkg: string): Chalk => {
  if (!cache[pkg]) {
    const color = colors[index];
    let str = ((chalk as any)[color] as Chalk).bold(pkg) as any as Chalk;
    cache[pkg] = str;

    if (index === colors.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  }

  return cache[pkg];
};
