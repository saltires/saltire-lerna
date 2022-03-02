'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const chalk_1 = __importDefault(require('chalk'));
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
const cache = {};
exports.default = (pkg) => {
  if (!cache[pkg]) {
    const color = colors[index];
    let str = chalk_1.default[color].bold(pkg);
    cache[pkg] = str;
    if (index === colors.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  }
  return cache[pkg];
};
