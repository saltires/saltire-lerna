"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hex2rgb = exports.rgb2hex = void 0;
const rgb2hex_1 = __importDefault(require("./rgb2hex"));
const hex2rgb_1 = __importDefault(require("./hex2rgb"));
exports.rgb2hex = rgb2hex_1.default;
exports.hex2rgb = hex2rgb_1.default;
