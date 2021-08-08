import { Type } from '@nestjs/common';

import { omitOpenAPIProperties, pickOpenAPIProperties } from './openapi.operators';
import { omitTransformerProperties, pickTransformerProperties } from './transformer.operators';
import { omitValidatorProperties, pickValidatorProperties } from './validator.operators';

// eslint-disable-next-line @typescript-eslint/ban-types
type Obj = {};

/* Create a derived DTO class from the `Base` DTO class.
 */
export function derive<T extends Obj>(
    Base: Type<T>,
    name: string,
): Type<T> {
    // NB: anonymous classes are named via their assigned variable
    return {
        [name]: class extends Base {},
    }[name];
}

/* Create a derived class that narrows the `Base` class by omitting fields.
 */
export function omit<T extends Obj, F extends keyof T>(Base: Type<T>, name: string, fields: F[]): Type<Omit<T, F>> {

    const operators = [
        omitOpenAPIProperties,
        omitTransformerProperties,
        omitValidatorProperties,
    ];

    return operators.reduce(
        (cls, operator) => operator(cls, fields),
        derive(Base, name),
    );
}

/* Create a derived class that narrows the `Base` class by picking fields.
 */
export function pick<T extends Obj, F extends keyof T>(Base: Type<T>, name: string, fields: F[]): Type<Pick<T, F>> {

    const operators = [
        pickOpenAPIProperties,
        pickTransformerProperties,
        pickValidatorProperties,
    ];

    return operators.reduce(
        (cls, operator) => operator(cls, fields),
        derive(Base, name),
    );
}
