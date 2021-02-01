import { IsInt, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer, IntegerOptions } from '../interfaces';

export function IsIntegerRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & IntegerOptions) => PropertyDecorator {
    return (
        options: Options & IntegerOptions = {} as Options & IntegerOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to number
        type: 'integer',
    }, initializers).add(
        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as an integer
        IsInt(),

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue) : undefined,
    ).build();
}
