import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { StringOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

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
        ...buildCommonPropertyDecorators(options),

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
