import { DecoratorOptions } from './decorator.options';

export interface IntegerOptions extends DecoratorOptions {
    maxValue?: number,
    minValue?: number,
}
