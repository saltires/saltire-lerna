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

export type AttrBehavior = 'add' | 'remove';

export type RegComponent = RegExp | string;
