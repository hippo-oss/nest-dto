/* class-transformer defines its decorators with a type signature that is close-to,
 * but not identical-to `PropertyDecorator`.
 */
// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
export type TransformerDecorator = (target: Function | Record<string, any>, propertyKey: string) => void;

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
