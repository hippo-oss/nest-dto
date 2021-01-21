import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { BuilderClass, StringOptions } from '../interfaces';

export function IsStringRecipe<Options extends StringOptions>(
    Builder: BuilderClass<Options>,
): (options?: Options) => PropertyDecorator {
    return (
        options?: Options,
    ): PropertyDecorator => new Builder({
        ...(options || {}),

        // set type to number
        type: 'string',
    }).add(
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
