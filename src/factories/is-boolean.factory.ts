import { IsBoolean } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { BuilderClass } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BooleanOptions {}

export function IsBooleanFactory<Options extends BooleanOptions>(
    Builder: BuilderClass<Options>,
): (options: Options) => PropertyDecorator {
    return (
        options: Options,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to number
        type: 'boolean',
    }).add(
        // convert strings to boolean
        TypePropertyDecorator(() => Boolean),

        // validate data as a boolean
        IsBoolean(),
    ).build();
}
