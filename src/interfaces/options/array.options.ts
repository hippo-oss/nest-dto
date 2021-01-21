import { Constructor } from '../constructor';

import { DecoratorOptions } from './decorator.options';

export interface ArrayOptions extends DecoratorOptions {
    type: Constructor,
    maxItems?: number,
    minItems?: number,
}
