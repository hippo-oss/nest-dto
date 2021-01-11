import { IsString } from 'class-validator';

import { BuilderClass } from '../interfaces';

// TODO: add regex

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StringOptions {}

export function IsStringFactory<Options extends StringOptions>(
    Builder: BuilderClass<Options>,
): (options: Options) => PropertyDecorator {
    return (
        options: Options,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to number
        type: 'string',
    }).add(
        // validate data as a string
        IsString(),
    ).build();
}
