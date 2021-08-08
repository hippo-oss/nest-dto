import 'reflect-metadata';
import { Type } from '@nestjs/common';

/* Narrow class-transformer properties by picking the provided fields.
 */
export function omitTransformerProperties<T, F extends keyof T>(
    cls: Type<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _fields: F[],
): Type<T> {

    // TODO
    return cls;
}

/* Narrow class-transformer properties by omitting the provided fields.
 */
export function pickTransformerProperties<T, F extends keyof T>(
    cls: Type<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _fields: F[],
): Type<T> {

    // TODO
    return cls;
}
