import { ValidateNested } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer, NestedOptions } from '../interfaces';
import { buildArrayPropertyDecorators } from './is-array.recipe';

export function IsNestedRecipe<Options>(
    initializers: Initializer<Options>[],
): (options: Options & NestedOptions) => PropertyDecorator {
    return (
        options: Options & NestedOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to nested type
        type: options.type,
    }, initializers).add(
        ...buildArrayPropertyDecorators(options.isArray),

        // convert to nested type
        TypePropertyDecorator(() => options.type),

        // validate nested
        ValidateNested({ each: !!options.isArray }),
    ).build();
}
