'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const marked_1 = require('marked');
module.exports = (source) => {
  const htmlContent = marked_1.marked.parse(source);
  return `module.exports = ${JSON.stringify(htmlContent)}`;
};
