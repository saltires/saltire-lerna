import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
declare const _default: (
  api: any,
  options: any,
) => {
  name: string;
  visitor: {
    ImportDeclaration(nodePath: NodePath<t.ImportDeclaration>): void;
  };
};
export default _default;
