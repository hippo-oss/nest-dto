import { IsInt, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { BuilderClass, IntegerOptions } from '../interfaces';

export function IsIntegerRecipe<Options extends IntegerOptions>(
    Builder: BuilderClass,
): (options?: Options) => PropertyDecorator {
    return (
        options?: Options,
    ): PropertyDecorator => new Builder({
        ...(options || {}),

        // set type to number
        type: 'integer',
    }).add(
        // convert strings to numbers
        TypePropertyDecorator(() => Number),

        // validate data as an integer
        IsInt(),

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue) : undefined,
    ).build();
}
