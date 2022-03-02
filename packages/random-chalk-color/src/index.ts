import chalk, { ChalkInstance } from 'chalk';

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
const cache: { [prop: string]: ChalkInstance } = {};

export default (pkg: string): ChalkInstance => {
  if (!cache[pkg]) {
    const color = colors[index];
    let str = ((chalk as any)[color] as ChalkInstance).bold(pkg) as any as ChalkInstance;
    cache[pkg] = str;

    if (index === colors.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  }

  return cache[pkg];
};
