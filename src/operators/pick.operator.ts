import { Type } from '@nestjs/common';
import { pickTransformerProperties, pickValidatorProperties } from '@hippo-oss/class-decorators';
import { pickOpenAPIProperties } from '@hippo-oss/openapi-decorators';

import { Obj, derive } from './derive.operator';

/* Create a derived class that narrows the `Base` class by picking fields.
 */
export function pick<T extends Obj, F extends keyof T, I extends keyof T>(
    Base: Type<T>,
    name: string,
    fields: F[],
    ignoreFields: I[] = [],
): Type<Pick<T, F>> {

    const operators = [
        pickOpenAPIProperties,
        pickTransformerProperties,
        pickValidatorProperties,
    ];

    return operators.reduce(
        (cls, operator) => operator(cls, fields, ignoreFields),
        derive(Base, name),
    );
}
