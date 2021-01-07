import { Constructor } from '../types.constructor';
import { HasOptions } from '../types.options';

export interface FooOptions {
    foo: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Foo<B extends Constructor<HasOptions<FooOptions>>>(Base: B) {
    return class FooMixin extends Base {

        public foo(): string {
            return this.options.foo;
        }
    };
}
