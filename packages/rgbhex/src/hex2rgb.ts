import { isHexColorLike, RgbColor, HexColorLike } from './util';

export default (color: HexColorLike): RgbColor | null => {
  if (isHexColorLike(color) && color.length >= 4) {
    // Handling abbreviation formats like # 111
    if (color.length === 4) {
      let colorNew = '#';
      for (let i = 1; i < 4; i++) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }

    const colorChange = [];

    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
    }

    return 'rgba(' + colorChange.join(',') + ',1)';
  } else {
    throw new Error('given color (' + color + ") isn't a valid hex color");
  }
};
