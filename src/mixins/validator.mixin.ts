import { IsDefined, IsOptional } from 'class-validator';

import { BuilderClass, Constructor } from '../interfaces';

export interface ValidatorOptions {
    // nullable means that the value type should be "T | null"
    nullable?: boolean;
    // optional means that the value type should be "T | undefined"
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

            if (this.options.optional || this.options.nullable) {
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
