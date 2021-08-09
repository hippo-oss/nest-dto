import { Type } from '@nestjs/common';

import { Obj, derive } from './derive.operator';
import { omitOpenAPIProperties } from './openapi.operators';
import { omitTransformerProperties } from './transformer.operators';
import { omitValidatorProperties } from './validator.operators';

/* Create a derived class that narrows the `Base` class by omitting fields.
 */
export function omit<T extends Obj, F extends keyof T>(
    Base: Type<T>,
    name: string,
    fields: F[],
): Type<Omit<T, F>> {

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
