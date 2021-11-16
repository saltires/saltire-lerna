export declare type Middleware<S> = (state: S) => Promise<void> | void;
/**
 * @description Classes for custom middleware
 */
export declare class Ware<S> {
  private readonly middlewares;
  /**
   * @description Use middleware. The parameter is the name of the middleware
   * @return { Ware }
   */
  use(middleware: Middleware<S>): Ware<S>;
  /**
   * @description Run all the middleware in turn and return the final processing result
   * @return { result }
   */
  run(state: S): Promise<void>;
}
