import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ArraySizeOptions } from '../options';

export interface SwaggerOptions {
    description?: string;
    example?: unknown;
    enum?: Record<string, unknown>;
    enumName?: string;
    format?: string;
    isArray?: boolean | ArraySizeOptions;
    nullable?: boolean;
    maxLength?: number;
    maxItems?: number;
    maxValue?: number;
    minLength?: number;
    minItems?: number;
    minValue?: number;
    name?: string;
    optional?: boolean;
    type?: string | Type | Type[];
}

export function normalizeArraySizeOptions<Options extends SwaggerOptions>(
    options: Options,
): ArraySizeOptions | undefined {
    if (!options.isArray) {
        return undefined;
    }

    if (options.isArray === true) {
        return {};
    }

    return options.isArray;
}

export function initializeSwagger<Options extends SwaggerOptions>(
    options: Options,
): PropertyDecorator[] {
    const isArray = normalizeArraySizeOptions(options);

    return [
        ApiProperty({
            enum: options.enum,
            enumName: options.enumName,
            example: options.example,
            name: options.name,
            description: options.description,
            format: options.format,
            isArray: !!options.isArray,
            maximum: options.maxValue,
            maxLength: options.maxLength,
            maxItems: options.maxItems !== undefined ? options.maxItems : isArray?.maxItems,
            minimum: options.minValue,
            minLength: options.minLength,
            minItems: options.minItems !== undefined ? options.minItems : isArray?.minItems,
            nullable: options.nullable,
            required: !options.optional,
            type: options.type,
        }),
    ];
}
