import { plainToClass } from 'class-transformer';

import { Builder } from '../../builder';
import { TransformerOptions, initializeTransformer } from '../transformer.initializer';

describe('initializers', () => {
    const initializers = [
        initializeTransformer,
    ];

    describe('initializerTransformer', () => {
        const options = {
            excludeExtraneousValues: true,
        };
        const plain = {
            value: 'foo',
        };

        it('defaults to not exposed', () => {
            const builder = new Builder<TransformerOptions>({}, initializers);
            expect(builder.decorators).toHaveLength(0);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value!: string;

                constructor(value: string) {
                    this.value = value;
                }
            }

            const obj = plainToClass(Fixture, plain, options);
            expect(obj.value).not.toBeDefined();
        });
        it('can be set to exposed', () => {
            const builder = new Builder<TransformerOptions>({ expose: true }, initializers);
            expect(builder.decorators).toHaveLength(1);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value!: string;

                constructor(value: string) {
                    this.value = value;
                }
            }

            const obj = plainToClass(Fixture, plain, options);
            expect(obj.value).toEqual('foo');
        });
        it('can be set to not exposed', () => {
            const builder = new Builder<TransformerOptions>({ expose: false }, initializers);
            expect(builder.decorators).toHaveLength(0);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value!: string;

                constructor(value: string) {
                    this.value = value;
                }
            }

            const obj = plainToClass(Fixture, plain, options);
            expect(obj.value).not.toBeDefined();
        });
        it('transform null to undefinded', () => {
            const builder = new Builder<TransformerOptions>({
                expose: true,
                optional: true,
                nullable: false,
            }, initializers);
            expect(builder.decorators).toHaveLength(2);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value?: string;
            }

            const obj = plainToClass(Fixture, { value: null }, options);
            expect(obj.value).not.toBeDefined();
        });
    });
});
