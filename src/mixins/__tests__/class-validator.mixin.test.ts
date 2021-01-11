import { getMetadataStorage } from 'class-validator';

import { createBuilder } from '../../builders';
import { ClassValidatorOptions, withClassValidator } from '../class-validator.mixin';

const Builder = withClassValidator(createBuilder<ClassValidatorOptions>());

describe('mixins', () => {
    describe('ClassValidatorMixin', () => {
        const metadataStorage = getMetadataStorage();

        it('defaults to required', () => {
            const builder = new Builder({
            });
            expect(builder.decorators).toHaveLength(1);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value!: string;
            }

            const metadatas = metadataStorage.getTargetValidationMetadatas(Fixture, '');
            expect(metadatas).toHaveLength(1);
            expect(metadatas[0].type).toEqual('isDefined');
        });
        it('can be set to optional', () => {
            const builder = new Builder({
                optional: true,
            });
            expect(builder.decorators).toHaveLength(1);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value?: string;
            }

            const metadatas = metadataStorage.getTargetValidationMetadatas(Fixture, '');
            expect(metadatas).toHaveLength(1);
            expect(metadatas[0].type).toEqual('conditionalValidation');
        });
        it('can be set to required', () => {
            const builder = new Builder({
                optional: false,
            });
            expect(builder.decorators).toHaveLength(1);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value!: string;
            }

            const metadatas = metadataStorage.getTargetValidationMetadatas(Fixture, '');
            expect(metadatas).toHaveLength(1);
            expect(metadatas[0].type).toEqual('isDefined');
        });
    });
});
