import { IsUUID as IsUUIDValidator } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';

export function IsUUID<Options>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    return new Builder({
        ...options,

        // OpenAPI expresses UUID as a string format
        type: 'string',
        format: 'uuid',
    }).add(
        // validate data as a string
        IsUUIDValidator(),
    ).build();
}
