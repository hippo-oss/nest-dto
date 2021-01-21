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

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue) : undefined,
    ).build();
}
