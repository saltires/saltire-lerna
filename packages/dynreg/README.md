# dynreg ![coverage](https://img.shields.io/badge/coverage-98.01%25-green) ![test](https://img.shields.io/badge/passed-tests-blue)

## Getting started

Install with npm:

```sh
npm install dynreg -S
```

Then `require` and use it in your code:

```javascript
const { dynreg } = require('dynreg');

// Generates a nums-only reg, Any of the following methods will do
dynreg('n').test(3) === true;
dynreg('N') === new Regex('^[0-9]$');
dynreg(['N']);
dynreg(['n']);
```

## API

Dynreg currently provides only one API to generate the regex required for form validation.

It returns a regular expression object.

### dynreg

```javascript
dynreg(Input);
```

For Input, They can be a combination of any letters in ['A','N','S','C'], The following formats are supported

```javascript
dynreg('na')  | dynreg(['n', 'a'])// 支持手动输入数字（N）、字母（A）
dynreg('nac') | | dynreg(['n', 'a', 'c']) // 支持手动输入数字（N）、字母（A）、文字（C）
dynreg('nacs') | dynreg(['n', 'a', 'c', 's'])// 支持手动输入数字（N）、字母（A）、文字（C）、符号（S）
dynreg('n') | dynreg(['n'])// 支持手动输入数字（N）
```

`Notice`: ['A','N','S','C'] is not case sensitive
