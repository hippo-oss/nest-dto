import { ApiProperty } from '@nestjs/swagger';

import { Constructor, HasInputDecorators, HasOptions } from '../interfaces';

export interface SwaggerOptions {
    description?: string;
    format?: string;
    nullable?: boolean;
    type?: string,
}

type BaseBuilder = HasInputDecorators & HasOptions<SwaggerOptions>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function withSwagger<B extends Constructor<BaseBuilder>>(Base: B) {
    return class ClassValidatorMixin extends Base {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);

            this.api();
        }

        public api(): this {
            this.add(
                ApiProperty({
                    description: this.options.description,
                    format: this.options.format,
                    nullable: this.options.nullable,
                    type: this.options.type,
                }),
            );
            return this;
        }
    };
}
