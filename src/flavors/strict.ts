/* Defines a flavor of decorators that always enables the `@Expose` decorator
 * so that only explicitly annotated properties will be used.
 */
import { DecoratorFactory } from '../interfaces';
import {
    IsBoolean as BasicIsBoolean,
    IsDate as BasicIsDate,
    IsEnum as BasicIsEnum,
    IsInteger as BasicIsInteger,
    IsNested as BasicIsNested,
    IsNumber as BasicIsNumber,
    IsString as BasicIsString,
    IsUUID as BasicIsUUID,
} from './basic';

/* Wrap a decorator factory so that it always sets the `expose` option.
 */
function alwaysExpose<Options>(factory: DecoratorFactory<Options>) {
    return (options: Options): PropertyDecorator => factory({
        ...options,
        expose: true,
    });
}

export const IsBoolean = alwaysExpose(BasicIsBoolean);
export const IsDate = alwaysExpose(BasicIsDate);
export const IsEnum = alwaysExpose(BasicIsEnum);
export const IsInteger = alwaysExpose(BasicIsInteger);
export const IsNested = alwaysExpose(BasicIsNested);
export const IsNumber = alwaysExpose(BasicIsNumber);
export const IsString = alwaysExpose(BasicIsString);
export const IsUUID = alwaysExpose(BasicIsUUID);
