import { ApiProperty } from '@nestjs/swagger';

import { Constructor } from '../interfaces';

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

export function initializeSwagger<Options extends SwaggerOptions>(
    options: Options,
): PropertyDecorator[] {
    return [
        ApiProperty({
            enum: options.enum,
            enumName: options.enumName,
            description: options.description,
            format: options.format,
            maximum: options.maxValue,
            maxLength: options.maxLength,
            maxItems: options.maxItems,
            minimum: options.minValue,
            minLength: options.minLength,
            minItems: options.minItems,
            nullable: options.nullable,
            required: !options.optional,
            type: options.type,
        }),
    ];
}
