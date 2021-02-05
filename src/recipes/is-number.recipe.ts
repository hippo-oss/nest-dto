import { IsNumber, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer, NumberOptions } from '../interfaces';
import { buildArrayPropertyDecorators } from './is-array.recipe';

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
        ...buildArrayPropertyDecorators(options.isArray),

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
