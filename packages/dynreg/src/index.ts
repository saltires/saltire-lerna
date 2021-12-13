import { RegLike as Option, Recorder, ValidateItem } from './type';

/**
 * Dynamically generated regularization（动态生成正则）
 * @param option Option
 */
export const dynreg = (option: Option): RegExp | null => {
  const recorder: Recorder = {
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

  if (recorder?.Symbol?.active === true) {
    let symbolString = [];

    for (const iterator of Object.keys(recorder)) {
      if (recorder[iterator]?.active === false) {
        symbolString.push(recorder[iterator]?.reg);
      }
    }

    let reg = `^[^${symbolString.join('')}]+$`;
    console.log(reg);
    return new RegExp(reg);
  }

  let regString = [];

  for (const iterator of Object.keys(recorder)) {
    if (recorder[iterator]?.active === true) {
      regString.push(recorder[iterator]?.reg);
    }
  }

  const ret = `^[${regString.join('')}]+$`;

  return new RegExp(ret);
};

/**
 * resolve params
 * @param option { Option }
 * @param recorder { Recorder }
 */
function parseParams(option: Option, recorder: Recorder) {
  let recorderWrapper: Array<String> = [];
  const validates: Array<ValidateItem> = [
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

  function notNull(list: Array<String>) {
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
    recorderWrapper.forEach((item: String) => {
      validates.forEach((validate: ValidateItem) => {
        if (validate.value.test(<string>item)) {
          recorder[validate.key].active = true;
        }
      });
    });
  }

  return true;
}
