import 'reflect-metadata';
import { Type } from '@nestjs/common';

/* Narrow class-validator properties by picking the provided fields.
 */
export function omitValidatorProperties<T, F extends keyof T>(
    cls: Type<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _fields: F[],
): Type<T> {

    // TODO
    return cls;
}

/* Narrow class-validator properties by omitting the provided fields.
 */
export function pickValidatorProperties<T, F extends keyof T>(
    cls: Type<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _fields: F[],
): Type<T> {

    // TODO
    return cls;
}
