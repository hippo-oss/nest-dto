/* Decorator mixins need access to type-specific options.
 *
 * To make this work, we need both a way for each mixin to express the options
 * it needs and a way to ensure that options are accessible in a base class.
 */
import { Constructor } from './constructor.types';

/* An interface that expresses that a type has a particular kind of options.
 */
export interface HasOptions<Options> {
    options: Options;
}

/* A mixin factory that adds support for options building.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function WithOptions<Options>(Base: Constructor = Object) {
    return class WithOptionsMixin extends Base implements HasOptions<Options> {
        constructor(
            public readonly options: Options,
        ) {
            super();
        }
    };
}
