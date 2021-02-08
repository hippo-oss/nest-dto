import { Constructor } from '../constructor';

import { ArraySizeOptions, DecoratorOptions } from './decorator.options';

export interface ArrayOptions extends DecoratorOptions, ArraySizeOptions {
    type: Constructor,
}
