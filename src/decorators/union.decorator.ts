import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsInteger, IsNumber, IsString } from '../flavors/openapi';

export type OpenAPIDecoratorType = typeof IsBoolean
    | typeof IsInteger
    | typeof IsNumber
    | typeof IsString;

export type OpenAPIType = 'boolean' | 'integer' | 'number' | 'string';

export interface OpenAPIRef {
    $ref: string;
}

export function asType(item: OpenAPIDecoratorType): OpenAPIType {
    switch (item) {
        case IsBoolean:
            return 'boolean';
        case IsInteger:
            return 'integer';
        case IsNumber:
            return 'number';
        case IsString:
            return 'string';
        default:
            break;
    }

    throw new Error('Missing case statement');
}

export function Union(types: OpenAPIDecoratorType[]): PropertyDecorator {
    return ApiProperty({
        oneOf: types.map(
            (item) => ({
                type: asType(item),
            }),
        ),
    });
}
