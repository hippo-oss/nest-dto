import { ArrayMinSize, ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { ArrayOptions, BuilderClass } from '../interfaces';

export function isObject<T>(value: T): boolean {
    return value !== null && typeof value === 'object';
}

export function IsArrayRecipe<Options extends ArrayOptions>(
    Builder: BuilderClass<Options>,
): (options: Options) => PropertyDecorator {
    return (
        options: Options,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to nested type
        type: [options.type],
    }).add(
        // convert to array of nested type
        TypePropertyDecorator(() => options.type),

        // validate data as array
        IsArray(),

        // maybe: add a maximum size
        options?.maxItems !== undefined ? ArrayMaxSize(options.maxItems) : undefined,

        // maybe: add a minimum size
        options?.minItems !== undefined ? ArrayMinSize(options.minItems) : undefined,

        // maybe: validate nested type
        isObject(options.type) ? ValidateNested() : undefined,
    ).build();
}
