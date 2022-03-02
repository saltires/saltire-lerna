# @niocn/plugin-transform-arrow-functions

> @niocn/plugin-transform-arrow-functions

## Installation

```shell
$ npm install @niocn/plugin-transform-arrow-functions
 -D

# or yarn
$ yarn add @niocn/plugin-transform-arrow-functions -D
```

## Usage

```javascript
const pluginTransformArrowFunctions = require('plugin-transform-arrow-functions');

const babelCore = require('@babel/core');
const babelTypes = require('@babel/types');

const source = `
const sum = (a, b) => {
  return a + b
}
`;

const result = babelCore.transform(source, {
  plugins: [pluginTransformArrowFunctions],
});
```
