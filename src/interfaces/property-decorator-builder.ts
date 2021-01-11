import { Constructor } from './constructor';
import { HasOptions } from './has-options';
import { HasPropertyDecorators } from './has-property-decorators';

/* A `Builder` transforms typed options and a collection of `PropertyDecorator`
 * into a single `PropertyDecorator`.
 */
export interface Builder<Options> extends HasOptions<Options>, HasPropertyDecorators {

    build(): PropertyDecorator;
}

/* Decorators work with a "flavor" of builder, represented by a constructor for a
 * concrete `Builder` class.
 */
export type BuilderClass<Options> = Constructor<Builder<Options>>;
