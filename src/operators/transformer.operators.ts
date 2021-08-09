import { Type } from '@nestjs/common';
import { plainToClass, Exclude } from 'class-transformer';

import { Obj } from './derive.operator';

/* Narrow class-transformer properties by picking the provided fields.
 */
export function omitTransformerProperties<T, F extends keyof T>(
    cls: Type<T>,
    fields: F[],
): Type<T> {

    const decorator = Exclude();

    // decorate each omitted field as `@Exclude()`
    for (const field of fields) {
        if (typeof field === 'string') {
            decorator(cls, field);
        }
    }

    return cls;
}

/* Narrow class-transformer properties by omitting the provided fields.
 */
export function pickTransformerProperties<T extends Obj, F extends keyof T>(
    cls: Type<T>,
    fields: F[],
): Type<T> {

    const decorator = Exclude();

    // create a canary instance of the class so we can detect its fields
    const canary = plainToClass(cls, {});

    // decorate each non-picked field as `@Exclude()`
    for (const field of Reflect.ownKeys(canary)) {
        if (typeof field === 'string' && !fields.includes(field as F)) {
            decorator(cls, field);
        }
    }

    return cls;
}
