import { IsNumber as IsNumberValidator, Max, Min } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';
import { TypePropertyDecorator } from '../mixins';

export interface IntegerOptions {
    maximum?: number,
    minimum?: number,
    type?: string,
}

export function IsNumber<Options extends IntegerOptions>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    return new Builder({
        ...options,

        // set type to number
        type: 'number',
    }).add(
        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as a number
        IsNumberValidator(),

        // maybe: add a maximum
        options.maximum !== undefined ? Max(options.maximum) : undefined,

        // maybe: add a minium
        options.minimum !== undefined ? Min(options.minimum) : undefined,
    ).build();
}
