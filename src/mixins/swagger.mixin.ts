import { ApiProperty } from '@nestjs/swagger';

import { Constructor, HasOptions, HasPropertyDecorators } from '../interfaces';

export interface SwaggerOptions {
    description?: string;
    enum?: Record<string, unknown>,
    enumName?: string;
    format?: string;
    nullable?: boolean;
    maxLength?: number,
    maxItems?: number,
    maxValue?: number,
    minLength?: number,
    minItems?: number,
    minValue?: number,
    optional?: boolean,
    type?: string | Constructor | Constructor[],
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
                    maximum: this.options.maxValue,
                    maxLength: this.options.maxLength,
                    maxItems: this.options.maxItems,
                    minimum: this.options.minValue,
                    minLength: this.options.minLength,
                    minItems: this.options.minItems,
                    nullable: this.options.nullable,
                    required: !this.options.optional,
                    type: this.options.type,
                }),
            );
            return this;
        }
    };
}
