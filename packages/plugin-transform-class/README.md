# plugin-transform-class

![coverage](https://img.shields.io/badge/Coverage-74.07%25%09-green) ![test](https://img.shields.io/badge/passed-tests-blue)

> The Babel plug-in for transforming classes in ES2015

## Installation

```shell
$ npm install plugin-transform-class -D

# or yarn
$ yarn add plugin-transform-class -D
```

## Getting started

```javascript
const pluginTransformClass = require('plugin-transform-class');
const babelCore = require('@babel/core');
const babelTypes = require('@babel/types');

const source = `
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  play() {
    console.log('playing')
  }

  number = '100'

  static range = 'unit'
}
`;

const result = babelCore.transform(source, {
  plugins: [pluginTransformClass],
});

console.log(result.code);
```
