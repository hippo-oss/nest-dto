import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import * as openapi from '../openapi';
import { INPUT, createFixtures } from './fixtures';

describe('flavors.openapi', () => {
    const Example = createFixtures(openapi);

    /* NB: it's tricky to correctly define the return type of `createFixtures` and
     * we get a "refers to a value, but is being used as a type here" compiler error
     * if we use it directly.
     *
     * Fortunately, we can define the return type as a `Type` and use a subclass,
     * which satisfied the compiler.
     */
    class ExampleDTO extends Example {}

    @Controller('example')
    class ExampleController {

        @Get()
        // NB: we normally rely on the OpenAPI CLI plugin to inject response decorators
        @ApiOkResponse({
            type: ExampleDTO,
        })
        public find(): ExampleDTO {
            return INPUT;
        }
    }

    it('validates required fields', async () => {
        const obj = plainToClass(Example, {});

        // we expect the data to be transformed
        expect(Object.keys(obj).length).toBeGreaterThan(0);
        expect(obj).toMatchSnapshot();

        const errors = await validate(obj);
        // we expect an error for every required field (but not the optional ones)
        expect(errors).toHaveLength(13);
        expect(errors).toMatchSnapshot();
    });
    it('transforms input data', async () => {
        const obj = plainToClass(Example, INPUT);

        // expect all data to be transformed
        expect(Object.keys(obj)).toHaveLength(35);
        expect(obj).toMatchObject({
            falseBooleanValue: false,
            zeroBooleanValue: false,
            requiredBooleanValue: true,
            requiredObjectArrayValue: [{
                requiredStringValue: 'nested',
            }],
            requiredPrimitiveArrayValue: [
                42,
            ],
            requiredNestedValue: {
                requiredStringValue: 'nested',
            },
            optionalObjectArrayValue: [{
                optionalStringValue: 'nested',
            }],
            optionalPrimitiveArrayValue: [
                42,
            ],
            optionalNestedValue: {
                optionalStringValue: 'nested',
            },
            nullableObjectArrayValue: [{
                nullableStringValue: 'nested',
            }],
            nullablePrimitiveArrayValue: [
                42,
            ],
            nullableNestedValue: {
                nullableStringValue: 'nested',
            },
        });

        const errors = await validate(obj);
        // we expect no errors
        expect(errors).toHaveLength(0);
        expect(errors).toMatchSnapshot();
    });
    it('generates OpenAPI spec', async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [
                ExampleController,
            ],
        }).compile();

        const app = moduleRef.createNestApplication();

        const options = new DocumentBuilder()
            .setTitle('Example')
            .build();

        const document = SwaggerModule.createDocument(app, options);

        const response = document.paths['/example']?.get?.responses[200];
        expect(response).toMatchObject({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ExampleDTO',
                    },
                },
            },
        });

        expect(document).toMatchSnapshot();
    });
});
