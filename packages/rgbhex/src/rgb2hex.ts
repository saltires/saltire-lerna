import { RgbColorLike, HexColor, isRgbColorLike } from './util';

/**
 * @desc convert RgbColorLike to hex
 */
const _convertRgbColor = (color: RgbColorLike): HexColor => {
  let red: number = 0;
  let green: number = 0;
  let blue: number = 0;
  let alpha: string | number = 1;

  if (typeof color === 'string') {
    const digits =
      /(.*?)rgb(a)??\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([01]|1.0*|0??\.([0-9]{0,})))??\)/.exec(color);

    if (!digits) {
      // or throw error if input isn't a valid rgb(a) color
      throw new Error('given color (' + color + ") isn't a valid rgb or rgba color");
    }

    red = parseInt(digits[3], 10);
    green = parseInt(digits[4], 10);
    blue = parseInt(digits[5], 10);
    alpha = digits[6] ? /([0-9\.]+)/.exec(digits[6])![0] : '1';

    if (alpha.substr(0, 1) === '.') {
      alpha = parseFloat('0' + alpha);
    }
  } else if (Array.isArray(color) && color.length >= 3) {
    red = Number(color[0]);
    green = Number(color[1]);
    blue = Number(color[2]);

    if (color.length > 3) {
      alpha = Number(color[3]);
    }
  } else {
    throw new Error('given color (' + color + ") isn't a valid rgb or rgba color");
  }

  const rgb = (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1);

  // cut alpha value after 2 digits after comma
  alpha = parseFloat(String(Math.round(Number(alpha) * 100))) / 100;

  return {
    // @ts-ignore
    hex: '#' + rgb.toString(16),
    alpha: alpha,
  };
};

export default (color: RgbColorLike): HexColor | null => {
  if (isRgbColorLike(color)) {
    return _convertRgbColor(color);
  } else {
    return null;
  }
};
