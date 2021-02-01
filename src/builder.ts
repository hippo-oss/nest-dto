import { Initializer } from './interfaces';

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

export function isPropertyDecorator(value: PropertyDecorator | undefined): value is PropertyDecorator {
    return value !== undefined;
}

/* A factory for a composed property decorator.
 */
export class Builder<Options> {
    public decorators: PropertyDecorator[] = [];

    constructor(
        public readonly options: Options,
        initializers: Initializer<Options>[] = [],
    ) {
        for (const initializer of initializers) {
            this.add(
                ...initializer(options),
            );
        }
    }

    public add(...decorators: (PropertyDecorator | undefined)[]): this {
        this.decorators.push(
            ...decorators.filter(isPropertyDecorator),
        );
        return this;
    }

    public build(): PropertyDecorator {
        return composePropertyDecorators(this.decorators);
    }
}
