import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

import { toPropertyDecorator } from './base';

/* class-transformer @Transform decorator requires a special function input.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransformFunction = (params: TransformFnParams) => any;

/* Adapt `class-transformer` `@Transform` to the `PropertyDecorator` type.
 */
export const TransformPropertyDecorator = (
    transformFn: TransformFunction,
    options?: TransformOptions,
): PropertyDecorator => toPropertyDecorator(
    Transform(transformFn, options),
);
