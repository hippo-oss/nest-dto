import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { Builder } from '../builder';
import { StringOptions, Initializer } from '../interfaces';

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
        // validate data as a string
        IsString(),

        // maybe: add a maximum length
        options?.maxLength !== undefined ? MaxLength(options.maxLength) : undefined,

        // maybe: add a minimum length
        options?.minLength !== undefined ? MinLength(options.minLength) : undefined,

        // maybe: add a regex
        options?.pattern !== undefined ? Matches(options.pattern) : undefined,
    ).build();
}
