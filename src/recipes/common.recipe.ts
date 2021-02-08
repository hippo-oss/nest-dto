import { ArrayMinSize, ArrayMaxSize, IsArray, Validate } from 'class-validator';

import { ArraySizeOptions, DecoratorOptions, ValidateOptions } from '../options';

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

export function buildValidatePropertyDecorator(
    options?: ValidateOptions,
): PropertyDecorator | undefined {
    if (!options) {
        return undefined;
    }

    return Validate(options);
}

export function buildCommonPropertyDecorators(options: DecoratorOptions): PropertyDecorator[] {
    const decorators = buildArrayPropertyDecorators(options.isArray);

    const validator = buildValidatePropertyDecorator(options.validate);
    if (validator) {
        decorators.push(validator);
    }

    return decorators;
}
