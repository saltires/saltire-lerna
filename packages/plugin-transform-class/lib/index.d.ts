import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
declare const _default: (
  api: any,
  options: any,
) => {
  name: string;
  visitor: {
    ClassDeclaration(nodepath: NodePath<t.ClassDeclaration>): void;
  };
};
export default _default;
