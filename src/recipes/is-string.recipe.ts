import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { Builder } from '../builder';
import { StringOptions, Initializer } from '../interfaces';
import { buildArrayPropertyDecorators } from './is-array.recipe';

export function IsStringRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & StringOptions) => PropertyDecorator {
    return (
        options: Options & StringOptions = {} as Options & StringOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to number
        type: 'string',
    }, initializers).add(
        ...buildArrayPropertyDecorators(options.isArray),

        // validate data as a string
        IsString({ each: !!options.isArray }),

        // maybe: add a maximum length
        options?.maxLength !== undefined ? MaxLength(options.maxLength, { each: !!options.isArray }) : undefined,

        // maybe: add a minimum length
        options?.minLength !== undefined ? MinLength(options.minLength, { each: !!options.isArray }) : undefined,

        // maybe: add a regex
        options?.pattern !== undefined ? Matches(options.pattern, { each: !!options.isArray }) : undefined,
    ).build();
}
