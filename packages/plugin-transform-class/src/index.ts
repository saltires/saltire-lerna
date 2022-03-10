import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

export default (api: any, options: any) => {
  return {
    name: '@niocn/plugin-transform-class',
    visitor: {
      ClassDeclaration(nodepath: NodePath<t.ClassDeclaration>) {
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
function transformClassToFunction(nodepath: NodePath<t.ClassDeclaration>) {
  const className = nodepath.node.id;
  const classMethods: Array<t.ClassMethod> = getClassMethods(nodepath);
  const classProperties: Array<t.ClassProperty> = getClassProperties(nodepath);
  let nodes: Array<t.FunctionDeclaration | t.ExpressionStatement> = [];

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
function transformClassProperties(
  classProperties: Array<t.ClassProperty>,
  className: t.Identifier,
  nodes: Array<t.FunctionDeclaration | t.ExpressionStatement>,
) {
  if (classProperties.length === 0) return;

  const staticClassProperties: Array<t.ClassProperty> = [];

  classProperties.forEach((item) => {
    if (item.static === true) {
      staticClassProperties.push(item);
      transformStaticClassProperties(staticClassProperties, nodes, className);
    } else {
      let constructorFn = nodes[0] as t.FunctionDeclaration;
      let memberExpression = t.memberExpression(t.thisExpression(), item.key);
      let assignmentExpression = t.assignmentExpression('=', memberExpression, item.value!);
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
function transformStaticClassProperties(
  staticClassProperties: Array<t.ClassProperty>,
  nodes: Array<t.FunctionDeclaration | t.ExpressionStatement>,
  className: t.Identifier,
) {
  if (staticClassProperties.length === 0) return;

  staticClassProperties.forEach((item) => {
    let leftMem = t.memberExpression(className, item.key);
    let rightMem = item.value!;
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
function replaceNodes(
  nodes: Array<t.FunctionDeclaration | t.ExpressionStatement>,
  nodepath: NodePath<t.ClassDeclaration>,
) {
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
function transformClassMethods(
  classMethods: Array<t.ClassMethod>,
  className: t.Identifier,
  nodes: Array<t.FunctionDeclaration | t.ExpressionStatement>,
) {
  if (classMethods.length === 0) return;

  classMethods.forEach((item) => {
    if (item.kind === 'constructor') {
      let constructorFn = t.functionDeclaration(
        className,
        item.params as (t.Identifier | t.Pattern | t.RestElement)[],
        item.body,
        item.generator,
        item.async,
      );
      nodes.push(constructorFn);
    } else if (item.kind === 'method') {
      let prototypeMem = t.memberExpression(className, t.identifier('prototype'));
      let methodMem = t.memberExpression(prototypeMem, item.key);
      let memberFunction = t.functionExpression(
        item.key as t.Identifier,
        item.params as (t.Identifier | t.Pattern | t.RestElement)[],
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
function getClassMethods(nodepath: NodePath<t.ClassDeclaration>) {
  const classMethods: Array<t.ClassMethod> = [];

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
function getClassProperties(nodepath: NodePath<t.ClassDeclaration>) {
  const classProperties: Array<t.ClassProperty> = [];

  nodepath.node.body.body.forEach((itemInClassBody) => {
    if (t.isClassProperty(itemInClassBody)) {
      classProperties.push(itemInClassBody);
    }
  });

  return classProperties;
}
