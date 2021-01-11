import { plainToClass } from 'class-transformer';

import { createBuilder } from '../../builders';
import { ClassTransformerOptions, withClassTransformer } from '../class-transformer.mixin';

const Builder = withClassTransformer(createBuilder<ClassTransformerOptions>());

describe('mixins', () => {
    describe('ClassTransformerMixin', () => {
        const options = {
            excludeExtraneousValues: true,
        };
        const plain = {
            value: 'foo',
        };

        it('defaults to not exposed', () => {
            const builder = new Builder({
            });
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
            const builder = new Builder({
                expose: true,
            });
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
            const builder = new Builder({
                expose: false,
            });
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
    });
});
