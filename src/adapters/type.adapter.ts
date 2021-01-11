import { TypeHelpOptions, TypeOptions, Type } from 'class-transformer';

import { toPropertyDecorator } from './base';

/* class-transformer @Type decorator requires a special function input.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type TypeFunction = (type?: TypeHelpOptions) => Function;

/* Adapt `class-transformer` `@Type` to the `PropertyDecorator` type.
 */
export const TypePropertyDecorator = (
    typeFn: TypeFunction,
    options?: TypeOptions,
): PropertyDecorator => toPropertyDecorator(
    Type(typeFn, options),
);
