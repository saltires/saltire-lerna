'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.dynreg = void 0;
/**
 * Dynamically generated regularization（动态生成正则）
 * @param option Option
 */
const dynreg = (option) => {
  var _a, _b, _c, _d, _e;
  const recorder = {
    // Just Support digital（仅支持数字）
    Number: {
      active: false,
      reg: '0-9',
    },
    // Just Support alpha（仅支持字母）
    Alpha: {
      active: false,
      reg: 'a-zA-Z',
    },
    // Just Support Chinese（仅支持中文文字）
    Chinese: {
      active: false,
      reg: '\u3007-\u9fa5',
    },
    // Just Support Symbol（仅支持符号，符号中包含空格）
    Symbol: {
      active: false,
      reg: '^(0-9a-zA-Z\u3007-\u9fa5)',
    },
  };
  if (parseParams(option, recorder) === false) {
    return null;
  }
  if (
    ((_a = recorder === null || recorder === void 0 ? void 0 : recorder.Symbol) === null ||
    _a === void 0
      ? void 0
      : _a.active) === true
  ) {
    let symbolString = [];
    for (const iterator of Object.keys(recorder)) {
      if (((_b = recorder[iterator]) === null || _b === void 0 ? void 0 : _b.active) === false) {
        symbolString.push((_c = recorder[iterator]) === null || _c === void 0 ? void 0 : _c.reg);
      }
    }
    let reg = `^[^${symbolString.join('')}]+$`;
    console.log(reg);
    return new RegExp(reg);
  }
  let regString = [];
  for (const iterator of Object.keys(recorder)) {
    if (((_d = recorder[iterator]) === null || _d === void 0 ? void 0 : _d.active) === true) {
      regString.push((_e = recorder[iterator]) === null || _e === void 0 ? void 0 : _e.reg);
    }
  }
  const ret = `^[${regString.join('')}]+$`;
  return new RegExp(ret);
};
exports.dynreg = dynreg;
/**
 * resolve params
 * @param option { Option }
 * @param recorder { Recorder }
 */
function parseParams(option, recorder) {
  let recorderWrapper = [];
  const validates = [
    {
      key: 'Number',
      value: /^n$/i,
    },
    {
      key: 'Alpha',
      value: /^a$/i,
    },
    {
      key: 'Chinese',
      value: /^c$/i,
    },
    {
      key: 'Symbol',
      value: /^s$/i,
    },
  ];
  function notNull(list) {
    if (list.length === 0) {
      return false;
    }
    return list.every((item) => {
      return item !== '';
    });
  }
  if (typeof option === 'string' && option !== '') {
    recorderWrapper = option.split('');
  } else if (Array.isArray(option) && option.length > 0 && notNull(option)) {
    recorderWrapper = option;
  } else {
    console.error(
      'The dynreg method was called with invalid parameters！\n Please Check your Options！You can use any letter in ANCS!',
    );
    return false;
  }
  if (recorderWrapper.length) {
    recorderWrapper.forEach((item) => {
      validates.forEach((validate) => {
        if (validate.value.test(item)) {
          recorder[validate.key].active = true;
        }
      });
    });
  }
  return true;
}
