import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

export default {
  name: 'transform-arrow-functions-alias',
  visitor: {
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
      if (path.node.type !== 'ArrowFunctionExpression') return;

      hoistFunctionEnvironment(path);

      (path.node.type as any) = 'FunctionExpression';
    },
  },
};

function hoistFunctionEnvironment(path: NodePath<t.ArrowFunctionExpression>) {
  const thisEnvFn = path.findParent((p) => {
    return (
      (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram() || p.isClassProperty()
    );
  });

  const thisPaths = getScopeInfomation(path);
  let thisBinding = '_this';

  if (thisPaths.length > 0) {
    thisEnvFn?.scope.push({
      id: t.identifier(thisBinding),
      init: t.thisExpression(),
    });

    thisPaths.forEach((p) => {
      let ref = t.identifier(thisBinding);
      p.replaceWith(ref);
    });
  }
}

function getScopeInfomation(path: NodePath<t.ArrowFunctionExpression>) {
  let thisPaths: Array<NodePath<t.ThisExpression>> = [];

  path.traverse({
    ThisExpression(thisPath: NodePath<t.ThisExpression>) {
      thisPaths.push(thisPath);
    },
  });

  return thisPaths;
}
