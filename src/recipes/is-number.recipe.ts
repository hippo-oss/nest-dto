import { IsNumber, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { NumberOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

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
        ...buildCommonPropertyDecorators(options),

        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as a number
        IsNumber({}, { each: !!options.isArray }),

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue, { each: !!options.isArray }) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue, { each: !!options.isArray }) : undefined,
    ).build();
}
