import 'reflect-metadata';
import { Type } from '@nestjs/common';
import { trimStart } from 'lodash';

/* @nestjs/swagger does not expose its internal metadata operations, so we partially
 * reproduce them here. Obviously, this code takes advantage of internal functionality
 * and may be subject to regression if the underlying library changes its implementation.
 */

/* The Reflect metadata key used to store the array of OpenAPI properties.
 */
const OPENAPI_PROPERTIES_ARRAY = 'swagger/apiModelPropertiesArray';

/* Set the the OpenAPI properties array.
 */
export function setPropertiesArray<T, F extends keyof T>(cls: Type<T>, fields: F[]): void {
    const propertiesArray = fields.map(
        (name: F): string => `:${String(name)}`,
    );

    // eslint-disable-next-line @typescript-eslint/ban-types
    Reflect.defineMetadata(OPENAPI_PROPERTIES_ARRAY, propertiesArray, cls.prototype as {});
}

/* Get the the OpenAPI properties array as fields.
 */
export function getPropertiesArray<T, F extends keyof T>(cls: Type<T>): F[] {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const propertiesArray = Reflect.getMetadata(OPENAPI_PROPERTIES_ARRAY, cls.prototype as {}) as unknown as string[];

    return (propertiesArray || []).map(
        (name: string) => trimStart(name, ':') as F,
    );
}

function matches<T, F extends keyof T>(fields: F[], field: F): boolean {
    return fields.includes(field);
}

/* Narrow OpenAPI properties by picking the provided fields.
 */
export function omitOpenAPIProperties<T, F extends keyof T>(cls: Type<T>, fields: F[]): Type<T> {
    const propertiesArray: F[] = getPropertiesArray(cls);

    setPropertiesArray(
        cls,
        propertiesArray.filter(
            (field) => !matches<T, F>(fields, field),
        ),
    );

    return cls;
}

/* Narrow OpenAPI properties by omitting the provided fields.
 */
export function pickOpenAPIProperties<T, F extends keyof T>(cls: Type<T>, fields: F[]): Type<T> {
    const propertiesArray: F[] = getPropertiesArray(cls);

    setPropertiesArray(
        cls,
        propertiesArray.filter(
            (field) => matches<T, F>(fields, field),
        ),
    );

    return cls;
}
