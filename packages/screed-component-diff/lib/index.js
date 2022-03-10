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
let globalOptions;
exports.default = (api, options) => {
  return {
    name: '@niocn/plugin-transform-class',
    visitor: {
      JSXOpeningElement(nodePath) {
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
        let jsxAttributes = nodePath.node.attributes || [];
        let attrsAddCompiler = processAtttributes('add', jsxAttributes);
        let attrsRemoveCompiler = processAtttributes('remove', jsxAttributes);
        attrsAddCompiler(ProcessAddAttributes);
        attrsRemoveCompiler(ProcessRemoveAttributes);
      },
    },
  };
};
function processAtttributes(type, jsxAttributes) {
  const behavior = globalOptions.attrs[type];
  return function (cb) {
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
function ProcessAddAttributes(jsxAttributes, key, value) {
  let hasSameKeyInJSXAttributes = false;
  jsxAttributes.forEach((item) => {
    if (item.name.name === key) {
      hasSameKeyInJSXAttributes = true;
    }
  });
  if (hasSameKeyInJSXAttributes) return;
  let jsxAttribute;
  if (value === null || value === undefined) {
    jsxAttribute = t.jsxAttribute(t.jsxIdentifier(key));
  } else {
    jsxAttribute = t.jsxAttribute(t.jsxIdentifier(key), t.stringLiteral(value));
  }
  jsxAttributes.push(jsxAttribute);
}
function ProcessRemoveAttributes(jsxAttributes, key) {
  if (!key || !jsxAttributes.length) return;
  jsxAttributes = jsxAttributes.filter((item) => {
    return item.name.name !== key;
  });
}
