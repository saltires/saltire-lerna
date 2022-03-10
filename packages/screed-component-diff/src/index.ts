import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { Options, AttrBehavior } from './types';

let globalOptions: Options;

export default (api: any, options: Options) => {
  return {
    name: '@niocn/plugin-transform-class',
    visitor: {
      JSXOpeningElement(nodePath: NodePath<t.JSXOpeningElement>) {
        if (!t.isJSXOpeningElement(nodePath)) return;

        if (
          !options ||
          !options.name ||
          !options.attrs ||
          (!options.attrs.add && !options.attrs.remove)
        )
          return;

        if (!t.isJSXIdentifier(nodePath.node.name)) return;

        if (options.name !== nodePath.node.name.name) return;

        globalOptions = options;

        let hasJSXSpreadAttribute = false;

        nodePath.node.attributes.length &&
          nodePath.node.attributes.forEach((item) => {
            if (t.isJSXSpreadAttribute(item)) {
              hasJSXSpreadAttribute = true;
            }
          });

        if (hasJSXSpreadAttribute) return;

        let jsxAttributes: Array<t.JSXAttribute> =
          (nodePath.node.attributes as Array<t.JSXAttribute>) || [];

        let attrsAddCompiler = processAtttributes('add', jsxAttributes);
        let attrsRemoveCompiler = processAtttributes('remove', jsxAttributes);

        attrsAddCompiler(ProcessAddAttributes);

        attrsRemoveCompiler(ProcessRemoveAttributes);
      },
    },
  };
};

function processAtttributes(type: AttrBehavior, jsxAttributes: Array<t.JSXAttribute>) {
  const behavior = globalOptions.attrs[type];
  return function (cb: attrsCallbackFn) {
    if (Array.isArray(behavior)) {
      behavior.forEach((key) => {
        cb(jsxAttributes, key);
      });
    } else {
      for (let key in behavior) {
        cb(jsxAttributes, key, behavior[key]);
      }
    }
  };
}

function ProcessAddAttributes(
  jsxAttributes: Array<t.JSXAttribute>,
  key: string,
  value: string | null | undefined,
): void {
  let hasSameKeyInJSXAttributes = false;

  jsxAttributes.forEach((item) => {
    if (item.name.name === key) {
      hasSameKeyInJSXAttributes = true;
    }
  });

  if (hasSameKeyInJSXAttributes) return;

  let jsxAttribute: t.JSXAttribute;

  if (value === null || value === undefined) {
    jsxAttribute = t.jsxAttribute(t.jsxIdentifier(key));
  } else {
    jsxAttribute = t.jsxAttribute(t.jsxIdentifier(key), t.stringLiteral(value));
  }

  jsxAttributes.push(jsxAttribute);
}

function ProcessRemoveAttributes(jsxAttributes: Array<t.JSXAttribute>, key: string): void {
  if (!key || !jsxAttributes.length) return;

  jsxAttributes = jsxAttributes.filter((item) => {
    return item.name.name !== key;
  });
}

export type attrsCallbackFn = (
  jsxAttributes: Array<t.JSXAttribute>,
  key: string,
  value?: string | null | undefined,
) => void;
