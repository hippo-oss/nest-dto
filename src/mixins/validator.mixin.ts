import { IsDefined, IsOptional } from 'class-validator';

import { BuilderClass } from '../interfaces';

export interface ValidatorOptions {
    optional?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withValidator<B extends BuilderClass<ValidatorOptions>>(Base: B) {
    return class ValidatorMixin extends Base {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);

            if (this.options.optional) {
                this.optional();
            } else {
                this.required();
            }
        }

        /* Mark property as optional.
         */
        public optional(): this {
            this.add(IsOptional());
            return this;
        }

        /* Mark property as required.
         */
        public required(): this {
            this.add(IsDefined());
            return this;
        }
    };
}
