export type RegLike = string | String[];

export interface Recorder {
  [i: string]: RecorderItem;
  // Just Support digital（仅支持数字）
  Number: RecorderItem;
  // Just Support alpha（仅支持字母）
  Alpha: RecorderItem;
  // Just Support Chinese（仅支持中文文字）
  Chinese: RecorderItem;
  // Just Support Symbol（仅支持符号，符号中包含空格）
  Symbol: RecorderItem;
}

export interface RecorderItem {
  active: boolean;
  reg: string;
}

export interface ValidateItem {
  key: string;
  value: RegExp;
}
