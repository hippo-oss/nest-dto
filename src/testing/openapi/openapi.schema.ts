import { OpenAPIObject } from '@nestjs/swagger';

// NestJS does not export the types for its JSON schema definitinos, so we create our own.

export interface OpenAPIProperty {
    name: string;
    description?: string;
    type?: string;
}

export interface OpenAPISchema {
    properties: OpenAPIProperty[];
}

export type OpenAPISchemas = Record<string, OpenAPISchema>;

/* Extract OpenAPI schemas from a document.
 *
 * These properties are essentially the JSON Schema for the DTOs.
 */
export function parseOpenAPISchemas(document: OpenAPIObject): OpenAPISchemas {
    const schemas = document?.components?.schemas || {};

    return Object.keys(schemas).reduce(
        // for each DTO
        (obj, dto) => {
            const schema = schemas[dto] || {};

            // for each property
            const { properties = {} } = 'properties' in schema ? schema : { properties: [] };

            return {
                ...obj,
                [dto]: {
                    properties: Object.entries(properties).map(
                        ([name, value]) => ({
                            name,
                            description: 'description' in value ? value.description : undefined,
                            type: 'type' in value ? value.type : undefined,
                        }),
                    ),
                },
            };
        },
        {} as OpenAPISchemas,
    );
}
