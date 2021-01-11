import { ComposedPropertyDecorator, InputDecorator } from '../interfaces';

/* Compose a collection of input decorators into a single decorator.
 */
export function composePropertyDecorators(decorators: InputDecorator[]): ComposedPropertyDecorator {
    return (target: unknown, propertyKey: string): void => {
        for (const decorator of decorators) {
            decorator(target, propertyKey);
        }
    };
}
