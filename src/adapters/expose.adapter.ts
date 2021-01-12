import { Expose, ExposeOptions } from 'class-transformer';

import { toPropertyDecorator } from './base';

/* Adapt `class-transformer` `@Expose` to the `PropertyDecorator` type.
 */
export const ExposePropertyDecorator = (
    options?: ExposeOptions,
): PropertyDecorator => toPropertyDecorator(
    Expose(options),
);
