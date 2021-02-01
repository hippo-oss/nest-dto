import { getMetadataStorage } from 'class-validator';

import { Builder } from '../../builder';
import { ValidatorOptions, initializeValidator } from '../validator.initializer';

// NB: the actual type is not currently exported from `class-validator`
interface ValidationMetadata {
    type: string;
}

describe('initializers', () => {
    const initializers = [
        initializeValidator,
    ];

    describe('initializerValidator', () => {
        const metadataStorage = getMetadataStorage();

        // eslint-disable-next-line @typescript-eslint/ban-types
        function getValidationMetadatas(target: Function): ValidationMetadata[] {
            return metadataStorage.getTargetValidationMetadatas(target, '', true, true);
        }

        it('defaults to required', () => {
            const builder = new Builder<ValidatorOptions>({}, initializers);
            expect(builder.decorators).toHaveLength(1);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value!: string;
            }

            const metadatas = getValidationMetadatas(Fixture);
            expect(metadatas).toHaveLength(1);
            expect(metadatas[0].type).toEqual('isDefined');
        });
        it('can be set to optional', () => {
            const builder = new Builder<ValidatorOptions>({ optional: true }, initializers);
            expect(builder.decorators).toHaveLength(1);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value?: string;
            }

            const metadatas = getValidationMetadatas(Fixture);
            expect(metadatas).toHaveLength(1);
            expect(metadatas[0].type).toEqual('conditionalValidation');
        });
        it('can be set to required', () => {
            const builder = new Builder<ValidatorOptions>({ optional: false }, initializers);
            expect(builder.decorators).toHaveLength(1);

            const decorator = builder.build();

            class Fixture {
                @decorator
                public value!: string;
            }

            const metadatas = getValidationMetadatas(Fixture);
            expect(metadatas).toHaveLength(1);
            expect(metadatas[0].type).toEqual('isDefined');
        });
    });
});
