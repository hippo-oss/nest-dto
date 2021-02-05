import { IsInt, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer, IntegerOptions } from '../interfaces';
import { buildArrayPropertyDecorators } from './is-array.recipe';

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
        ...buildArrayPropertyDecorators(options.isArray),

        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as an integer
        IsInt({ each: !!options.isArray }),

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue, { each: !!options.isArray }) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue, { each: !!options.isArray }) : undefined,
    ).build();
}
