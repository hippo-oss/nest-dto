import { ValidateNested } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { ArrayOptions } from '../options';
import {
    buildArrayPropertyDecorators,
    buildValidatePropertyDecorator,
} from './common.recipe';

export function isObject<T>(value: T): boolean {
    return value !== null && typeof value === 'object';
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

        buildValidatePropertyDecorator(options.validate),

        // maybe: validate nested type
        isObject(options.type) ? ValidateNested() : undefined,
    ).build();
}
