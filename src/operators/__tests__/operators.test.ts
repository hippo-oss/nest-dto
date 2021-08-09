import { plainToClass } from 'class-transformer';

import { IsString } from '../../flavors/openapi';
import {
    createOpenAPIDocument,
    createOpenAPIFixtureModule,
    parseOpenAPISchemas,
} from '../../testing';
import { derive, omit, pick } from '..';

class Foo {
    @IsString()
    bar!: string;

    @IsString()
    baz!: string;
}

describe('class.operators', () => {
    describe('derive', () => {
        it('creates a class with the expected name', () => {
            expect(derive(Foo, 'Bar').name).toEqual('Bar');
        });
    });
    describe('omit', () => {
        const Bar = omit(Foo, 'Bar', ['baz']);

        it('picks a subset of OpenAPI properties', async () => {
            const FixtureModule = createOpenAPIFixtureModule(Bar);
            const document = await createOpenAPIDocument(FixtureModule);
            const schemas = parseOpenAPISchemas(document);

            expect(schemas.Foo).not.toBeDefined();
            expect(schemas).toMatchObject({
                Bar: {
                    properties: [{
                        name: 'bar',
                        type: 'string',
                    }],
                },
            });
        });
        it('picks a subset of fields to transform', () => {
            const plain = {
                bar: 'bar',
                baz: 'baz',
            };
            expect(plainToClass(Foo, plain)).toEqual({
                bar: 'bar',
                baz: 'baz',
            });
            expect(plainToClass(Bar, plain)).toEqual({
                bar: 'bar',
            });
        });
    });
    describe('pick', () => {
        const Bar = pick(Foo, 'Bar', ['baz']);

        it('picks a subset of OpenAPI properties', async () => {
            const FixtureModule = createOpenAPIFixtureModule(Bar);
            const document = await createOpenAPIDocument(FixtureModule);
            const schemas = parseOpenAPISchemas(document);

            expect(schemas.Foo).not.toBeDefined();
            expect(schemas).toMatchObject({
                Bar: {
                    properties: [{
                        name: 'baz',
                        type: 'string',
                    }],
                },
            });
        });
        it('picks a subset of fields to transform', () => {
            const plain = {
                bar: 'bar',
                baz: 'baz',
            };
            expect(plainToClass(Foo, plain)).toEqual({
                bar: 'bar',
                baz: 'baz',
            });
            expect(plainToClass(Bar, plain)).toEqual({
                baz: 'baz',
            });
        });
    });
});
