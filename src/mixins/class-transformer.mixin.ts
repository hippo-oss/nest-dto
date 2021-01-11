import { Expose } from 'class-transformer';

import { Constructor, HasInputDecorators, HasOptions } from '../interfaces';

export interface ClassTransformerOptions {
    expose?: boolean;
}

type BaseBuilder = HasInputDecorators & HasOptions<ClassTransformerOptions>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withClassTransformer<B extends Constructor<BaseBuilder>>(Base: B) {
    return class ClassTransformerMixin extends Base {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);

            if (this.options.expose) {
                this.expose();
            }
        }

        /* Mark property as an exposed transformation target.
         *
         * Required if `class-transformer` is invoked with the `excludeExtraneousValues` option.
         */
        public expose(): this {
            this.add(Expose());
            return this;
        }
    };
}