import { ApiProperty } from '@nestjs/swagger';

import { Constructor, HasOptions, HasPropertyDecorators } from '../interfaces';

export interface SwaggerOptions {
    description?: string;
    enum?: Record<string, unknown>,
    enumName?: string;
    format?: string;
    nullable?: boolean;
    minimum?: number,
    maximum?: number,
    optional?: boolean,
    type?: string,
}

type BaseBuilder = HasOptions<SwaggerOptions> & HasPropertyDecorators;

export interface Swaggering {
    api(): this;
}

export function withSwagger<B extends Constructor<BaseBuilder>>(Base: B): Constructor<Swaggering> & B {
    return class ClassValidatorMixin extends Base {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);

            this.api();
        }

        public api(): this {
            this.add(
                ApiProperty({
                    enum: this.options.enum,
                    enumName: this.options.enumName,
                    description: this.options.description,
                    format: this.options.format,
                    minimum: this.options.minimum,
                    maximum: this.options.maximum,
                    nullable: this.options.nullable,
                    required: !this.options.optional,
                    type: this.options.type,
                }),
            );
            return this;
        }
    };
}
