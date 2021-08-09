import { Type } from '@nestjs/common';

import { Obj, derive } from './derive.operator';
import { pickOpenAPIProperties } from './openapi.operators';
import { pickTransformerProperties } from './transformer.operators';
import { pickValidatorProperties } from './validator.operators';

/* Create a derived class that narrows the `Base` class by picking fields.
 */
export function pick<T extends Obj, F extends keyof T>(
    Base: Type<T>,
    name: string,
    fields: F[],
): Type<Pick<T, F>> {

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
