const pluginScreed = require('../lib');

const babelCore = require('@babel/core');
const babelTypes = require('@babel/types');

const source = `
<h-icon name="success1" qishi></h-icon>
`;

const result0 = babelCore.transform(source, {
  presets: ['@vue/babel-preset-jsx'],
  plugins: [
    [
      pluginScreed,
      {
        name: 'h-icon',
        attrs: {
          add: {
            kngiht: 'qishi',
          },
          remove: ['qishi'],
        },
      },
    ],
  ],
});

const result1 = babelCore.transform(source, {
  presets: ['@babel/preset-react'],
  plugins: [
    [
      pluginScreed,
      {
        name: 'h-icon',
        attrs: {
          add: {
            kngiht: 'qishi',
          },
          remove: ['qishi'],
        },
      },
    ],
  ],
});

// console.log(result.code);

test('测试 vue', () => {
  expect(result0.code).toMatch(/kngiht/);
});

test('测试 react', () => {
  expect(result1.code).toMatch(/kngiht/);
});
