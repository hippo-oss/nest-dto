import { ValidateNested } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { BuilderClass, NestedOptions } from '../interfaces';

export function IsNestedRecipe<Options extends NestedOptions>(
    Builder: BuilderClass<Options>,
): (options: Options) => PropertyDecorator {
    return (
        options: Options,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to nested type
        type: options.nested,
    }).add(
        // convert to nested type
        TypePropertyDecorator(() => options.nested),

        // validate nested
        ValidateNested(),
    ).build();
}
