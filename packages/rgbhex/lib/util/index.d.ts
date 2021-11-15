/**
 * RGBColorLike supports the following input types
 * string: rgb(25,25,25) rgba(25,25,25,1) rgb(25,25,25) rgb(25,25,25)
 * string[]: ['25','25','25','1'] ['25','25','25']
 * number[]: [25,25,25,1] [25,25,25]
 */
export declare type RgbColorLike = string | string[] | number[];
/**
 * HexColorLike only support the string
 */
export declare type HexColorLike = string;
export declare const isRgbColorLike: (color: RgbColorLike) => boolean;
export declare const isHexColorLike: (color: string) => boolean;
export interface HexColor {
    hex: string;
    alpha: number;
}
export declare type RgbColor = string;
