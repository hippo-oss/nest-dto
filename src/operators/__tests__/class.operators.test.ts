import { IsString } from '../../flavors/openapi';
import {
    createOpenAPIDocument,
    createOpenAPIFixtureModule,
    parseOpenAPISchemas,
} from '../../testing';
import { derive, omit, pick } from '../class.operators';

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
        it('picks a subset of OpenAPI properties', async () => {
            const Bar = omit(Foo, 'Bar', ['baz']);
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
    });
    describe('pick', () => {
        it('picks a subset of OpenAPI properties', async () => {
            const Bar = pick(Foo, 'Bar', ['baz']);
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
    });
});
