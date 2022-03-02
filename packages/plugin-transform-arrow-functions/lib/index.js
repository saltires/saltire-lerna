'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = {
  name: 'transform-arrow-functions-alias',
  visitor: {
    ArrowFunctionExpression(path) {
      if (path.node.type !== 'ArrowFunctionExpression') return;
      path.node.type = 'FunctionExpression';
    },
  },
};
