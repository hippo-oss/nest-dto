import { DecoratorOptions } from './decorator.options';

export interface StringOptions extends DecoratorOptions {
    maxLength?: number,
    minLength?: number,
    pattern?: RegExp;
}
