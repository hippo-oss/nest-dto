import { ExposeOptions, Transform } from 'class-transformer';

import { ExposePropertyDecorator } from '../adapters';
import { nullToUndefined } from '../operators';

export interface TransformerOptions {
    expose?: boolean;
    name?: string;
    nullable?: boolean,
    optional?: boolean,
}

export function initializeTransformer<Options extends TransformerOptions>(
    options: Options,
): PropertyDecorator[] {

    const decorators: PropertyDecorator[] = [];

    if (options.expose) {
        decorators.push(ExposePropertyDecorator(options as ExposeOptions));
    }

    if (!options.nullable && options.optional) {
        decorators.push(Transform(nullToUndefined));
    }

    return decorators;
}

export function initializeStrictTransformer<Options extends TransformerOptions>(
    options: Options,
): PropertyDecorator[] {

    const decorators: PropertyDecorator[] = [
        ExposePropertyDecorator(options as ExposeOptions),
    ];

    if (!options.nullable && options.optional) {
        decorators.push(Transform(nullToUndefined));
    }

    return decorators;
}
