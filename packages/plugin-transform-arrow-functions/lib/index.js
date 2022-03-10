'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const t = __importStar(require('@babel/types'));
exports.default = {
  name: 'transform-arrow-functions-alias',
  visitor: {
    ArrowFunctionExpression(path) {
      if (path.node.type !== 'ArrowFunctionExpression') return;
      hoistFunctionEnvironment(path);
      path.node.type = 'FunctionExpression';
    },
  },
};
function hoistFunctionEnvironment(path) {
  const thisEnvFn = path.findParent((p) => {
    return (
      (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram() || p.isClassProperty()
    );
  });
  const thisPaths = getScopeInfomation(path);
  let thisBinding = '_this';
  if (thisPaths.length > 0) {
    thisEnvFn === null || thisEnvFn === void 0
      ? void 0
      : thisEnvFn.scope.push({
          id: t.identifier(thisBinding),
          init: t.thisExpression(),
        });
    thisPaths.forEach((p) => {
      let ref = t.identifier(thisBinding);
      p.replaceWith(ref);
    });
  }
}
function getScopeInfomation(path) {
  let thisPaths = [];
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath);
    },
  });
  return thisPaths;
}
