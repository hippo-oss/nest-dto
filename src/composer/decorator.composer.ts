import {
    ComposedPropertyDecorator,
    HasInputDecorators,
    InputDecorator,
} from '../types';

/* Compose a collection of input decorators into a single decorator.
 */
export class DecoratorComposer implements HasInputDecorators {
    public readonly decorators: InputDecorator[] = [];

    public add(decorator: InputDecorator): this {
        this.decorators.push(decorator);
        return this;
    }

    public compose(): ComposedPropertyDecorator {
        return (target: unknown, propertyKey: string): void => {
            for (const decorator of this.decorators) {
                decorator(target, propertyKey);
            }
        };
    }
}
