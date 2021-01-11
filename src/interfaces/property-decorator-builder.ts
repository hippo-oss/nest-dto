import { HasOptions } from './has-options';
import { HasPropertyDecorators } from './has-property-decorators';

/* A `PropertyDecoratorBuilder` transforms typed options and a collection of `PropertyDecorator`
 * into a single `PropertyDecorator`.
 */
export interface PropertyDecoratorBuilder<O> extends HasOptions<O>, HasPropertyDecorators {

    build(): PropertyDecorator;
}
