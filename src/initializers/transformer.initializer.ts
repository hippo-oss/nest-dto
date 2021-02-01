import { ExposeOptions } from 'class-transformer';
import { ExposePropertyDecorator } from '../adapters';

export interface TransformerOptions {
    expose?: boolean;
}

export function initializeTransformer<Options extends TransformerOptions>(
    options: Options,
): PropertyDecorator[] {
    if (!options.expose) {
        return [];
    }

    return [
        ExposePropertyDecorator(options as ExposeOptions),
    ];
}
