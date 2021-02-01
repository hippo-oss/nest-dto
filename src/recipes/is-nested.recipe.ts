import { ValidateNested } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { BuilderClass, NestedOptions } from '../interfaces';

export function IsNestedRecipe<Options extends NestedOptions>(
    Builder: BuilderClass,
): (options: Options) => PropertyDecorator {
    return (
        options: Options,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to nested type
        type: options.type,
    }).add(
        // convert to nested type
        TypePropertyDecorator(() => options.type),

        // validate nested
        ValidateNested(),
    ).build();
}
