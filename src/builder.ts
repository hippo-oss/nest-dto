import { Builder, BuilderInitializer, Constructor } from './interfaces';

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
 */
export function createBuilder<Options>(
    ...initializers: BuilderInitializer<Options>[]
): Constructor<Builder> {

    return class BaseBuilder implements Builder {
        constructor(
            public readonly options: Options,
            public decorators: PropertyDecorator[] = [],
        ) {
            for (const initializer of initializers) {
                this.add(...initializer(options));
            }
        }

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
