import { DecoratorOptions } from './decorator.options';

export interface EnumOptions extends DecoratorOptions {
    enum: Record<string, unknown>,
    enumName?: string;
}
