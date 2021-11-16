'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Ware = void 0;
/**
 * @description Classes for custom middleware
 */
class Ware {
  constructor() {
    this.middlewares = [];
  }
  /**
   * @description Use middleware. The parameter is the name of the middleware
   * @return { Ware }
   */
  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }
  /**
   * @description Run all the middleware in turn and return the final processing result
   * @return { result }
   */
  run(state) {
    return this.middlewares.reduce(
      (prev, current) => prev.then(() => current(state)),
      Promise.resolve(),
    );
  }
}
exports.Ware = Ware;
