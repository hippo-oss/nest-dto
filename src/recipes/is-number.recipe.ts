import { IsNumber, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { BuilderClass, NumberOptions } from '../interfaces';

export function IsNumberRecipe<Options extends NumberOptions>(
    Builder: BuilderClass<Options>,
): (options?: Options) => PropertyDecorator {
    return (
        options?: Options,
    ): PropertyDecorator => new Builder({
        ...(options || {}),

        // set type to number
        type: 'number',
    }).add(
        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as a number
        IsNumber(),

        // maybe: add a maximum
        options?.maximum !== undefined ? Max(options.maximum) : undefined,

        // maybe: add a minium
        options?.minimum !== undefined ? Min(options.minimum) : undefined,
    ).build();
}
