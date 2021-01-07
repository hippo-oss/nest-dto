import { Constructor } from '../types.constructor';
import { HasOptions } from '../types.options';

export interface BarOptions {
    bar?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Bar<B extends Constructor<HasOptions<BarOptions>>>(Base: B) {
    return class BarMixin extends Base {

        public bar(): number | undefined {
            return this.options.bar;
        }
    };
}
