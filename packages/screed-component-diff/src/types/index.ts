export interface Options {
  name: string;
  attrs: {
    add: {
      [props: string]: string | undefined | null;
    };
    remove: Array<string>;
  };
}

export type AttrBehavior = 'add' | 'remove';
