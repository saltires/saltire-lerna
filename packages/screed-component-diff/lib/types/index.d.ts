export interface Options {
  name: string;
  reg: {
    attrs: {
      [props: string]: RegComponent;
    };
  };
  attrs: {
    add: {
      [props: string]: string | undefined | null;
    };
    remove: Array<string>;
  };
}
export declare type AttrBehavior = 'add' | 'remove';
export declare type RegComponent = RegExp | string;
