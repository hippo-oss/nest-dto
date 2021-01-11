import { composePropertyDecorators } from '../composed';
import { HasOptions, HasPropertyDecorators } from '../interfaces';

/* A factory function for a builder.
 *
 * Used as input to a chain of mixins.
 *
 * TypeScript doesn't allow passing a typed class (e.g. `Builder<Options>`) to a mixin,
 * but does allow passing a typed function call that returns a class (e.g. `createBuilder<Options>()`)
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createBuilder<Options>() {
    return class Builder implements HasOptions<Options>, HasPropertyDecorators {
        constructor(
            public readonly options: Options,
            public decorators: PropertyDecorator[] = [],
        ) { }

        public add(decorator: PropertyDecorator): this {
            this.decorators.push(decorator);
            return this;
        }

        public build(): PropertyDecorator {
            return composePropertyDecorators(this.decorators);
        }
    };
}
