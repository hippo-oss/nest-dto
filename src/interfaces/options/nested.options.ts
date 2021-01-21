import { Constructor } from '../constructor';
import { DecoratorOptions } from './decorator.options';

export interface NestedOptions extends DecoratorOptions {
    type: Constructor,
}
