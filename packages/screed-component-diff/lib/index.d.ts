import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { Options } from './types';
declare const _default: (
  api: any,
  options: Options,
) => {
  name: string;
  visitor: {
    JSXOpeningElement(nodePath: NodePath<t.JSXOpeningElement>): void;
  };
};
export default _default;
export declare type attrsCallbackFn = (key: string, value?: string | null | undefined) => void;
