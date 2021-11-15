/**
 * RGBColorLike supports the following input types
 * string: rgb(25,25,25) rgba(25,25,25,1) rgb(25,25,25) rgb(25,25,25)
 * string[]: ['25','25','25','1'] ['25','25','25']
 * number[]: [25,25,25,1] [25,25,25]
 */
export type RgbColorLike = string | string[] | number[];

/**
 * HexColorLike only support the string
 */
export type HexColorLike = string;

export const isRgbColorLike = (color: RgbColorLike) => {
  if (typeof color === 'string' || Array.isArray(color)) {
    return true;
  }

  return false;
};

export const isHexColorLike = (color: string) => {
  return typeof color === 'string' && color.indexOf('#') === 0;
};

export interface HexColor {
  hex: string;
  alpha: number;
}

export type RgbColor = string;
