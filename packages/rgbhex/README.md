# @ahau2019/rgbhex ![coverage](https://img.shields.io/badge/coverage-100%25-green) ![test](https://img.shields.io/badge/test-pass-blue)

## Getting started

Install with npm:

```sh
npm install @ahau2019/rgbhex -S
```

Then `require` and use it in your code:

```javascript
const { rgb2hex, hex2rgb } = require('chokidar');

// convert rgb color to hex
rgb2hex('rgba(255,255,255,1)');
// {
//   hex: '#ffffff',
//   alpha: 1
// }
```

## API

@ahau2019/rgbhex provides two APIs to support RGB and HEX transitions

### rgb2hex

```javascript
// RGB2HEX supports multiple forms of input like
// 1 rgb(255,255,255)
// 2 rgba(255,255,255,.8)
// 3 [255,255,255]
// 4 [255,255,255,1]
// 5 ['255','255','255','1']
// 5 ['255','255','255']

expect(rgb2hex('rgb(255,255,255)')).toEqual({
  hex: '#ffffff',
  alpha: 1,
});

expect(rgb2hex('rgba(255,255,255,.5)')).toEqual({
  hex: '#ffffff',
  alpha: 0.5,
});

expect(rgb2hex('rgba(255,255,255,1)')).toEqual({
  hex: '#ffffff',
  alpha: 1,
});

expect(rgb2hex([255, 255, 255])).toEqual({
  hex: '#ffffff',
  alpha: 1,
});

expect(rgb2hex([255, 255, 255, 0.5])).toEqual({
  hex: '#ffffff',
  alpha: 0.5,
});

expect(rgb2hex(['255', '255', '255', '.5'])).toEqual({
  hex: '#ffffff',
  alpha: 0.5,
});
```

### hex2rgb

```javascript
// HEX2RGB only supports input of string formats like #fff or #ffffff

expect(hex2rgb('#FFFFFF')).toBe('rgba(255,255,255,1)');

expect(hex2rgb('#FFF')).toBe('rgba(255,255,255,1)');
```
