# screed-component-diff

![coverage](https://img.shields.io/badge/Coverage-60.6%25-green) ![test](https://img.shields.io/badge/passed-tests-blue)

> Helps users smooth out differences in the use of certain components

## Installation

```shell
$ npm install screed-component-diff -D

# or yarn
$ yarn add screed-component-diff -D
```

## Getting started

```javascript
const pluginScreed = require('screed-component-diff');
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

console.log(result0.code);
console.log(result1.code);

test('test vue', () => {
  expect(result0.code).toMatch(/kngiht/);
});

test('test react', () => {
  expect(result1.code).toMatch(/kngiht/);
});
```
