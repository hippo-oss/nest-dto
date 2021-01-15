import { IsDefined, IsOptional } from 'class-validator';

import { BuilderClass, Constructor } from '../interfaces';

export interface ValidatorOptions {
    optional?: boolean;
}

export interface Validating {
    optional(): this;
    required(): this;
}

export function withValidator<B extends BuilderClass<ValidatorOptions>>(Base: B): Constructor<Validating> & B {
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
