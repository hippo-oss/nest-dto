import { Builder } from './interfaces';

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

/* A factory function for a builder.
 *
 * Used as input to a chain of mixins.
 *
 * TypeScript doesn't allow passing a typed class (e.g. `Builder<Options>`) to a mixin,
 * but does allow passing a typed function call that returns a class (e.g. `createBuilder<Options>()`)
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createBuilder<Options>() {
    return class BaseBuilder implements Builder<Options> {
        constructor(
            public readonly options: Options,
            public decorators: PropertyDecorator[] = [],
        ) { }

        public add(...decorators: PropertyDecorator[]): this {
            this.decorators.push(...decorators.filter(
                (decorator) => decorator !== undefined,
            ));
            return this;
        }

        public build(): PropertyDecorator {
            return composePropertyDecorators(this.decorators);
        }
    };
}
