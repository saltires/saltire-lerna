import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

export default (api: any, options: any) => {
  return {
    name: '@niocn/plugin-transform-import',
    visitor: {
      ImportDeclaration(nodePath: NodePath<t.ImportDeclaration>) {
        const { specifiers } = nodePath.node;

        if (!t.isImportDefaultSpecifier(specifiers[0]) && specifiers.length > 0) {
          const importDeclarations = specifiers.map((item) => {
            if (t.isImportSpecifier(item)) {
              const importDefaultSpecifier = t.importDefaultSpecifier(item.local);
              const source = t.stringLiteral(`${nodePath.node.source.value}/${item.local.name}`);
              return t.importDeclaration([importDefaultSpecifier], source);
            }
          });

          if (importDeclarations.length === 1) {
            nodePath.replaceWith(importDeclarations[0]!);
          } else if (importDeclarations.length > 1) {
            nodePath.replaceWithMultiple(importDeclarations as t.ImportDeclaration[]);
          }
        }
      },
    },
  };
};
