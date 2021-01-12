import { DecoratorFactory, DecoratorFactoryOptional } from './decorator-factory';
import {
    BooleanOptions,
    DateOptions,
    EnumOptions,
    IntegerOptions,
    NestedOptions,
    NumberOptions,
    StringOptions,
    UUIDOptions,
} from './options';

/* A collection of decorator (factories) using a specific baseline configuration.
 */
export interface Flavor<Options> {
    IsBoolean: DecoratorFactoryOptional<Options & BooleanOptions>;
    IsDate: DecoratorFactoryOptional<Options & DateOptions>;
    IsEnum: DecoratorFactory<Options & EnumOptions>;
    IsInteger: DecoratorFactoryOptional<Options & IntegerOptions>;
    IsNested: DecoratorFactory<Options & NestedOptions>;
    IsNumber: DecoratorFactoryOptional<Options & NumberOptions>;
    IsString: DecoratorFactoryOptional<Options & StringOptions>;
    IsUUID: DecoratorFactoryOptional<Options & UUIDOptions>;
}
