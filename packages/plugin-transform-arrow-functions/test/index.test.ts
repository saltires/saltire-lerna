// const { test, expect } = require('jest')
const pluginTranArrow = require('../lib');

// TODO: Implement module test
const babelCore = require('@babel/core');
const babelTypes = require('@babel/types');

const source = `
const sum = (a, b) => {
  return a + b
}
`;

const result = babelCore.transform(source, {
  plugins: [pluginTranArrow],
});

// console.log(result.code)

test('测试转换结果', () => {
  expect(result.code).toMatch(/function/);
});
