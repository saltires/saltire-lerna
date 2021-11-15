"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHexColorLike = exports.isRgbColorLike = void 0;
const isRgbColorLike = (color) => {
    if (typeof color === 'string' || Array.isArray(color)) {
        return true;
    }
    return false;
};
exports.isRgbColorLike = isRgbColorLike;
const isHexColorLike = (color) => {
    return typeof color === 'string' && color.indexOf('#') === 0;
};
exports.isHexColorLike = isHexColorLike;
