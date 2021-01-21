import { DecoratorOptions } from './decorator.options';

export interface NumberOptions extends DecoratorOptions {
    maxValue?: number,
    minValue?: number,
}
