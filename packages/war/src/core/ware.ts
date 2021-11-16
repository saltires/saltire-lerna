export type Middleware<S> = (state: S) => Promise<void> | void;

/**
 * @description Classes for custom middleware
 */
export class Ware<S> {
  private readonly middlewares: Array<Middleware<S>> = [];

  /**
   * @description Use middleware. The parameter is the name of the middleware
   * @return { Ware }
   */
  use(middleware: Middleware<S>): Ware<S> {
    this.middlewares.push(middleware);
    return this;
  }

  /**
   * @description Run all the middleware in turn and return the final processing result
   * @return { result }
   */
  run(state: S): Promise<void> {
    return this.middlewares.reduce(
      (prev, current) => prev.then(() => current(state)),
      Promise.resolve(),
    );
  }
}
