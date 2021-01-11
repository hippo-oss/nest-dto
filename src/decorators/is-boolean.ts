import { IsBoolean as IsBooleanValidator } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';
import { TypePropertyDecorator } from '../mixins';

export function IsBoolean<Options>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    return new Builder({
        ...options,

        // set type to number
        type: 'boolean',
    }).add(
        // convert strings to boolean
        TypePropertyDecorator(() => Boolean),

        // validate data as a boolean
        IsBooleanValidator(),
    ).build();
}
