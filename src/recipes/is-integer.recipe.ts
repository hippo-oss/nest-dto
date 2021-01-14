import { IsInt, Max, Min } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { BuilderClass, IntegerOptions } from '../interfaces';

export function IsIntegerRecipe<Options extends IntegerOptions>(
    Builder: BuilderClass<Options>,
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

        // maybe: add a maximum
        options?.maximum !== undefined ? Max(options.maximum) : undefined,

        // maybe: add a minium
        options?.minimum !== undefined ? Min(options.minimum) : undefined,
    ).build();
}
