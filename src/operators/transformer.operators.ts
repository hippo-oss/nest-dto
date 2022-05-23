import { Type } from '@nestjs/common';
import { plainToClass, Exclude } from 'class-transformer';

import { Obj } from './derive.operator';

/* Return the available keys for a class.
 *
 * Because class members are assigned as part of the `constructor` function and TypeScript
 * metadata is lost at runtime (unless `reflect-metadata` or similar is used), the only
 * way to enumerate a class's members is to instantiate it, especially as `class-transformer`
 * opts to implement its own `MetadataStorage` using a private/inaccessible implementation.
 */
function keysForClass<T extends Obj>(cls: Type<T>): string[] {
    // create a canary instance of the class so we can detect its fields
    const canary = plainToClass(cls, {});

    return Reflect.ownKeys(canary).filter(
        (key: string | symbol): key is string => typeof key === 'string',
    );
}

/* Narrow class-transformer properties by omitting the provided fields.
 */
export function pickTransformerProperties<T extends Obj, F extends keyof T>(
    cls: Type<T>,
    fields: F[],
): Type<T> {

    const decorator = Exclude();

    // decorate each non-picked field as `@Exclude()`
    for (const field of keysForClass(cls)) {
        if (!fields.includes(field as F)) {
            // eslint-disable-next-line @typescript-eslint/ban-types
            decorator(cls.prototype as {}, field);
        }
    }

    return cls;
}
