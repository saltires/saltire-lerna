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
exports.default = (api, options) => {
  return {
    name: '@niocn/plugin-transform-class',
    visitor: {
      ClassDeclaration(nodepath) {
        if (nodepath.node.type !== 'ClassDeclaration') return;
        transformClassToFunction(nodepath);
      },
    },
  };
};
/**
 * 把类转换为函数
 * @param nodepath
 */
function transformClassToFunction(nodepath) {
  const className = nodepath.node.id;
  const classMethods = getClassMethods(nodepath);
  const classProperties = getClassProperties(nodepath);
  let nodes = [];
  transformClassMethods(classMethods, className, nodes);
  transformClassProperties(classProperties, className, nodes);
  replaceNodes(nodes, nodepath);
}
/**
 * @desc 转换类的属性
 * @param classProperties
 * @param className
 * @param nodes
 * @returns
 */
function transformClassProperties(classProperties, className, nodes) {
  if (classProperties.length === 0) return;
  const staticClassProperties = [];
  classProperties.forEach((item) => {
    if (item.static === true) {
      staticClassProperties.push(item);
      transformStaticClassProperties(staticClassProperties, nodes, className);
    } else {
      let constructorFn = nodes[0];
      let memberExpression = t.memberExpression(t.thisExpression(), item.key);
      let assignmentExpression = t.assignmentExpression('=', memberExpression, item.value);
      let expressionStatement = t.expressionStatement(assignmentExpression);
      constructorFn.body.body.push(expressionStatement);
    }
  });
}
/**
 * @desc 转换类的静态属性
 * @param staticClassProperties
 * @param nodes
 * @param className
 * @returns
 */
function transformStaticClassProperties(staticClassProperties, nodes, className) {
  if (staticClassProperties.length === 0) return;
  staticClassProperties.forEach((item) => {
    let leftMem = t.memberExpression(className, item.key);
    let rightMem = item.value;
    let assignmentExpression = t.assignmentExpression('=', leftMem, rightMem);
    let expressionStatement = t.expressionStatement(assignmentExpression);
    nodes.push(expressionStatement);
  });
}
/**
 * @desc 替换最终的节点
 * @param nodes
 * @param nodepath
 */
function replaceNodes(nodes, nodepath) {
  if (nodes.length === 1) {
    nodepath.replaceWith(nodes[0]);
  } else if (nodes.length > 1) {
    nodepath.replaceWithMultiple(nodes);
  }
}
/**
 * @desc 转换类的方法
 * @param classMethods
 * @param className
 * @param nodes
 * @returns
 */
function transformClassMethods(classMethods, className, nodes) {
  if (classMethods.length === 0) return;
  classMethods.forEach((item) => {
    if (item.kind === 'constructor') {
      let constructorFn = t.functionDeclaration(
        className,
        item.params,
        item.body,
        item.generator,
        item.async,
      );
      nodes.push(constructorFn);
    } else if (item.kind === 'method') {
      let prototypeMem = t.memberExpression(className, t.identifier('prototype'));
      let methodMem = t.memberExpression(prototypeMem, item.key);
      let memberFunction = t.functionExpression(
        item.key,
        item.params,
        item.body,
        item.generator,
        item.async,
      );
      let assignmentExpression = t.assignmentExpression('=', methodMem, memberFunction);
      nodes.push(t.expressionStatement(assignmentExpression));
    }
  });
}
/**
 * @desc 获取类中的方法
 * @param nodepath
 * @returns
 */
function getClassMethods(nodepath) {
  const classMethods = [];
  nodepath.node.body.body.forEach((itemInClassBody) => {
    if (t.isClassMethod(itemInClassBody)) {
      classMethods.push(itemInClassBody);
    }
  });
  return classMethods;
}
/**
 * @desc 获取类中的属性
 * @param nodepath
 * @returns
 */
function getClassProperties(nodepath) {
  const classProperties = [];
  nodepath.node.body.body.forEach((itemInClassBody) => {
    if (t.isClassProperty(itemInClassBody)) {
      classProperties.push(itemInClassBody);
    }
  });
  return classProperties;
}
