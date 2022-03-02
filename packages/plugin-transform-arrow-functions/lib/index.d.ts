import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';
declare const _default: {
  name: string;
  visitor: {
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>): void;
  };
};
export default _default;
