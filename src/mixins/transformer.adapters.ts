/* Adapter types between `class-transformer` decorators and PropertyDecorators.
 */
import {
    Expose,
    ExposeOptions,
    Transform,
    TransformOptions,
    TransformationType,
    TypeHelpOptions,
    TypeOptions,
    Type,
} from 'class-transformer';

/* class-transformer defines its decorators with a type signature that is close-to,
 * but not identical-to `PropertyDecorator`.
 */
// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
export type TransformerDecorator = (target: Function | Record<string, any>, propertyKey: string) => void;

/* class-transformer @Transform decorator requires a special function input.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransformFunction = (value: any, obj: any, transformationType: TransformationType) => any;

/* class-transformer @Type decorator requires a special function input.
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export type TypeFunction = (type?: TypeHelpOptions) => Function;

export function isSymbol(value: string | symbol): value is symbol {
    return typeof value === 'symbol';
}

/* Adapt a `TransformerDecorator` to the `PropertyDecorator` type.
 */
export function toPropertyDecorator(decorator: TransformerDecorator): PropertyDecorator {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-types
        target: Object,
        propertyKey: string | symbol,
    ) => decorator(
        target,
        isSymbol(propertyKey) ? String(propertyKey) : propertyKey,
    );
}

export const ExposePropertyDecorator = (
    options?: ExposeOptions,
): PropertyDecorator => toPropertyDecorator(Expose(options));

export const TransformPropertyDecorator = (
    transformFn: TransformFunction,
    options?: TransformOptions,
): PropertyDecorator => toPropertyDecorator(Transform(transformFn, options));

export const TypePropertyDecorator = (
    typeFn: TypeFunction,
    options?: TypeOptions,
): PropertyDecorator => toPropertyDecorator(Type(typeFn, options));
