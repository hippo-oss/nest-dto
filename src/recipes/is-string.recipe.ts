import { IsString, Matches } from 'class-validator';

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

        // maybe: add a regex
        options?.pattern !== undefined ? Matches(options.pattern) : undefined,
    ).build();
}
