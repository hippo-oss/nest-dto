import { IsNumber, IsString } from '../../flavors/openapi';
import {
    createOpenAPIDocument,
    createOpenAPIFixtureModule,
} from '../../testing';
import { Union } from '../union.decorator';

class Foo {

    @Union([
        IsString,
        IsNumber,
    ])
    bar!: string | number;
}

describe('decorators', () => {
    describe('Union', () => {
        it('generates a oneOf definition', async () => {
            const FixtureModule = createOpenAPIFixtureModule(Foo);
            const document = await createOpenAPIDocument(FixtureModule);

            expect(document).toMatchSnapshot();
        });
    });
});
