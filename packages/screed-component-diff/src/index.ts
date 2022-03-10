import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { Options, AttrBehavior, RegComponent } from './types';

let globalOptions: Options;
let jsxAttributes: Array<t.JSXAttribute>;

export default (api: any, options: Options) => {
  return {
    name: 'plugin-screed-component-diff',
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
        let passReg = true;

        nodePath.node.attributes.length &&
          nodePath.node.attributes.forEach((item) => {
            if (t.isJSXSpreadAttribute(item)) {
              hasJSXSpreadAttribute = true;
            }
          });

        if (hasJSXSpreadAttribute) return;

        jsxAttributes = (nodePath.node.attributes as Array<t.JSXAttribute>) || [];

        passReg = checkReg(options, passReg);

        if (!passReg) return;

        let attrsAddCompiler = processAtttributes('add');
        let attrsRemoveCompiler = processAtttributes('remove');

        attrsRemoveCompiler(ProcessRemoveAttributes);

        attrsAddCompiler(ProcessAddAttributes);

        nodePath.node.attributes = jsxAttributes;
      },
    },
  };
};

function checkReg(options: Options, pass: boolean): boolean {
  if (options?.reg?.attrs && Object.keys(options?.reg?.attrs).length > 0) {
    let regAttrs = options.reg.attrs;

    for (let key in regAttrs) {
      if (regAttrs.hasOwnProperty(key)) {
        let reg = regAttrs[key];

        if (reg instanceof String) {
          reg = new RegExp(reg);
        }

        jsxAttributes.length &&
          jsxAttributes.forEach((item) => {
            if (item.name.name === key) {
              if ((reg as RegExp).test((item.value as t.StringLiteral).value)) {
                pass = true;
              } else {
                pass = false;
              }
            }
          });
      }
    }
  }

  return pass;
}

function processAtttributes(type: AttrBehavior) {
  const behavior = globalOptions.attrs[type];
  return function (cb: attrsCallbackFn) {
    if (Array.isArray(behavior)) {
      behavior.forEach((key) => {
        cb(key);
      });
    } else {
      for (let key in behavior) {
        cb(key, behavior[key]);
      }
    }
  };
}

function ProcessAddAttributes(key: string, value: string | null | undefined): void {
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

function ProcessRemoveAttributes(key: string): void {
  if (!key || !jsxAttributes.length) return;

  jsxAttributes = jsxAttributes.filter((item) => {
    return item.name.name !== key;
  });
}

export type attrsCallbackFn = (key: string, value?: string | null | undefined) => void;
