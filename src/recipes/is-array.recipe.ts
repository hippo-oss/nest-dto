import { ArrayMinSize, ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { ArrayOptions, ArraySizeOptions, Initializer } from '../interfaces';

export function isObject<T>(value: T): boolean {
    return value !== null && typeof value === 'object';
}

export function buildArrayPropertyDecorators(
    options?: boolean | ArraySizeOptions,
): PropertyDecorator[] {
    const decorators: PropertyDecorator[] = [];

    if (!options) {
        return decorators;
    }

    // validate data as array
    decorators.push(IsArray());

    // maybe: add a maximum size
    if (options !== true && options.maxItems !== undefined) {
        decorators.push(ArrayMaxSize(options.maxItems));
    }

    // maybe: add a minimum size
    if (options !== true && options.minItems !== undefined) {
        decorators.push(ArrayMinSize(options.minItems));
    }

    return decorators;
}

export function IsArrayRecipe<Options>(
    initializers: Initializer<Options>[],
): (options: Options & ArrayOptions) => PropertyDecorator {
    return (
        options: Options & ArrayOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to nested type
        type: [options.type],
    }, initializers).add(
        // convert to array of nested type
        TypePropertyDecorator(() => options.type),

        ...buildArrayPropertyDecorators(options),

        // maybe: validate nested type
        isObject(options.type) ? ValidateNested() : undefined,
    ).build();
}
