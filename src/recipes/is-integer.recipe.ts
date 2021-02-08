import { IsInt, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { IntegerOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

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
        ...buildCommonPropertyDecorators(options),

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
