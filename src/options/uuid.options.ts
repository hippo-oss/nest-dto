import { DecoratorOptions } from './decorator.options';

export interface UUIDOptions extends DecoratorOptions {
    version?: '3' | '4' | '5' | 'all',
}
