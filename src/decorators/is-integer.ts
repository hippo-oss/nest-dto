import { IsInt as IsIntegerValidator, Max, Min } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';
import { TypePropertyDecorator } from '../mixins';

export interface NumberOptions {
    maximum?: number,
    minimum?: number,
}

export function IsInteger<Options extends NumberOptions>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    return new Builder({
        ...options,

        // set type to number
        type: 'integer',
    }).add(
        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as a number
        IsIntegerValidator(),

        // maybe: add a maximum
        options.maximum !== undefined ? Max(options.maximum) : undefined,

        // maybe: add a minium
        options.minimum !== undefined ? Min(options.minimum) : undefined,
    ).build();
}
