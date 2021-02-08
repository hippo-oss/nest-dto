import { IsBoolean } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { BooleanOptions, Initializer } from '../interfaces';
import { buildArrayPropertyDecorators } from './is-array.recipe';

export function IsBooleanRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & BooleanOptions) => PropertyDecorator {
    return (
        options: Options & BooleanOptions = {} as Options & BooleanOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to number
        type: 'boolean',
    }, initializers).add(
        ...buildArrayPropertyDecorators(options.isArray),

        // convert strings to boolean
        TypePropertyDecorator(() => Boolean),

        // validate data as a boolean
        IsBoolean({ each: !!options.isArray }),
    ).build();
}
