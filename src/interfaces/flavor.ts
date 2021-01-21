import {
    ArrayOptions,
    BooleanOptions,
    DateOptions,
    DateStringOptions,
    EnumOptions,
    IntegerOptions,
    NestedOptions,
    NumberOptions,
    StringOptions,
    UUIDOptions,
} from './options';

/* A collection of decorator recipes using a specific options type.
 */
export interface Flavor {
    IsArray: (options: ArrayOptions) => PropertyDecorator,
    IsBoolean: (options?: BooleanOptions) => PropertyDecorator,
    IsDate: (options?: DateOptions) => PropertyDecorator,
    IsDateString: (options?: DateStringOptions) => PropertyDecorator,
    IsEnum: (options: EnumOptions) => PropertyDecorator,
    IsInteger: (options?: IntegerOptions) => PropertyDecorator,
    IsNested: (options: NestedOptions) => PropertyDecorator;
    IsNumber: (options?: NumberOptions) => PropertyDecorator,
    IsString: (options?: StringOptions) => PropertyDecorator,
    IsUUID: (options?: UUIDOptions) => PropertyDecorator,
}
