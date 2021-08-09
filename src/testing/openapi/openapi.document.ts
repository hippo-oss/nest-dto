import { NestFactory } from '@nestjs/core';
import {
    DocumentBuilder,
    OpenAPIObject,
    SwaggerModule,
} from '@nestjs/swagger';

/* Create an OpenAPI Document for a module.
 */
export async function createOpenAPIDocument(ModuleType: unknown): Promise<OpenAPIObject> {
    const builder = new DocumentBuilder();
    const options = builder.build();

    const app = await NestFactory.create(ModuleType, {
        logger: false,
    });
    const document = SwaggerModule.createDocument(app, options);
    await app.close();
    return document;
}
