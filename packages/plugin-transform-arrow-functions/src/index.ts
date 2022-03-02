import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

export default {
  name: 'transform-arrow-functions-alias',
  visitor: {
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
      if (path.node.type !== 'ArrowFunctionExpression') return;

      (path.node.type as any) = 'FunctionExpression';
    },
  },
};
