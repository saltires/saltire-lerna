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
let jsxAttributes;
exports.default = (api, options) => {
  return {
    name: 'plugin-screed-component-diff',
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
        let passReg = true;
        nodePath.node.attributes.length &&
          nodePath.node.attributes.forEach((item) => {
            if (t.isJSXSpreadAttribute(item)) {
              hasJSXSpreadAttribute = true;
            }
          });
        if (hasJSXSpreadAttribute) return;
        jsxAttributes = nodePath.node.attributes || [];
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
function checkReg(options, pass) {
  var _a, _b;
  if (
    ((_a = options === null || options === void 0 ? void 0 : options.reg) === null || _a === void 0
      ? void 0
      : _a.attrs) &&
    Object.keys(
      (_b = options === null || options === void 0 ? void 0 : options.reg) === null || _b === void 0
        ? void 0
        : _b.attrs,
    ).length > 0
  ) {
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
              if (reg.test(item.value.value)) {
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
function processAtttributes(type) {
  const behavior = globalOptions.attrs[type];
  return function (cb) {
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
function ProcessAddAttributes(key, value) {
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
function ProcessRemoveAttributes(key) {
  if (!key || !jsxAttributes.length) return;
  jsxAttributes = jsxAttributes.filter((item) => {
    return item.name.name !== key;
  });
}
