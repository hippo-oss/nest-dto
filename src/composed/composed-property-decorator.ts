/* Compose a collection of input decorators into a single decorator.
 */
export function composePropertyDecorators(decorators: PropertyDecorator[]): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target: Object, propertyKey: string | symbol): void => {
        for (const decorator of decorators) {
            decorator(target, propertyKey);
        }
    };
}
