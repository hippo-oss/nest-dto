import { IsNumber, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer, NumberOptions } from '../interfaces';

export function IsNumberRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & NumberOptions) => PropertyDecorator {
    return (
        options: Options & NumberOptions = {} as Options & NumberOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to number
        type: 'number',
    }, initializers).add(
        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as a number
        IsNumber(),

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue) : undefined,
    ).build();
}
