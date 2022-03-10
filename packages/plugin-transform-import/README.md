# @niocn/plugin-transform-import

![coverage](https://img.shields.io/badge/Coverage-52.77%25-green) ![test](https://img.shields.io/badge/passed-tests-blue)

> For some libraries such as LoDash, you can convert import statements to load on demand

## Installation

```shell
$ npm install @niocn/plugin-transform-import -D

# or yarn
$ yarn add @niocn/plugin-transform-import -D
```

## Getting started

```javascript
const pluginTransformImport = require('@niocn/plugin-transform-import');
const babelCore = require('@babel/core');
const babelTypes = require('@babel/types');

const source = `
import { flatten as x, concat } from 'lodash'
`;

const result = babelCore.transform(source, {
  plugins: [pluginTransformImport],
});

console.log(result.code);

test('test', () => {
  expect(result.code).toMatch(/lodash\/x/);
  expect(result.code).toMatch(/import concat from "lodash\/concat"/);
});
```
