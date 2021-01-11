import { ValidateNested } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';
import { TypePropertyDecorator } from '../mixins';

export interface NestedOptions {
    nested: Constructor,
}

export function IsNested<Options extends NestedOptions>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    return new Builder({
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
