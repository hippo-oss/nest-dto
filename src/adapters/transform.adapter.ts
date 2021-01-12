import { Transform, TransformOptions, TransformationType } from 'class-transformer';

import { toPropertyDecorator } from './base';

/* class-transformer @Transform decorator requires a special function input.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransformFunction = (value: any, obj: any, transformationType: TransformationType) => any;
/* Adapt `class-transformer` `@Transform` to the `PropertyDecorator` type.
 */
export const TransformPropertyDecorator = (
    transformFn: TransformFunction,
    options?: TransformOptions,
): PropertyDecorator => toPropertyDecorator(
    Transform(transformFn, options),
);
