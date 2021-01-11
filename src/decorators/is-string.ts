import { IsString as IsStringValidator } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';

export function IsString<Options>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    return new Builder({
        ...options,

        // set type to number
        type: 'string',
    }).add(
        // validate data as a string
        IsStringValidator(),
    ).build();
}
