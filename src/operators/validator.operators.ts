import { Type } from '@nestjs/common';
import { IsOptional, getMetadataStorage } from 'class-validator';

/* Return the decorator properties of the given class.
 */
function propertiesForClass<T>(cls: Type<T>): string[] {
    const metadata = getMetadataStorage();

    const targetConstructor = cls;
    // The underlying Validator passes `undefined` even though the schema is typed as `string`.
    // See: https://github.com/typestack/class-validator/blob/develop/src/validation/Validator.ts#L100
    const targetSchema = undefined as unknown as string;
    const always = false;
    const strictGroups = false;
    const groups: string[] = [];

    const validators = metadata.getTargetValidationMetadatas(
        targetConstructor,
        targetSchema,
        always,
        strictGroups,
        groups,
    );

    return validators.map(
        ({ propertyName }) => propertyName,
    );
}

/* Narrow class-validator properties by picking the provided fields.
 */
export function omitValidatorProperties<T, F extends keyof T>(
    cls: Type<T>,
    fields: F[],
): Type<T> {

    const decorator = IsOptional();

    /// decorate each omitted field as `@IsOptional()`
    for (const field of fields) {
        if (typeof field === 'string') {
            // eslint-disable-next-line @typescript-eslint/ban-types
            decorator(cls.prototype as {}, field);
        }
    }

    return cls;
}

/* Narrow class-validator properties by omitting the provided fields.
 */
export function pickValidatorProperties<T, F extends keyof T>(
    cls: Type<T>,
    fields: F[],
): Type<T> {

    const decorator = IsOptional();

    // decorate each non-picked field as `@IsOptional()`
    for (const field of propertiesForClass(cls)) {
        if (!fields.includes(field as F)) {
            // eslint-disable-next-line @typescript-eslint/ban-types
            decorator(cls.prototype as {}, field);
        }
    }

    return cls;
}
