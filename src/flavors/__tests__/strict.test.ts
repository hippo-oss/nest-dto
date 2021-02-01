import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import * as strict from '../strict';
import { INPUT, createFixtures } from './fixtures';

describe('flavors.strict', () => {
    const Example = createFixtures(strict);

    it('validates required fields', async () => {
        const obj = plainToClass(Example, {});

        // expect every field to exist, but be undefined
        expect(Object.keys(obj)).toHaveLength(33);
        for (const value of Object.values(obj)) {
            expect(value).toBeUndefined();
        }
        expect(obj).toMatchSnapshot();

        const errors = await validate(obj);
        // we expect an error for every required field (but not the optional ones)
        expect(errors).toHaveLength(11);
        expect(errors).toMatchSnapshot();
    });
    it('transforms input data', async () => {
        const obj = plainToClass(Example, INPUT);

        // expect all data to be transformed
        expect(Object.keys(obj)).toHaveLength(33);
        expect(obj).toMatchObject({
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
    it('transforms input data if extraneous values are excluded', async () => {
        const obj = plainToClass(Example, INPUT, {
            excludeExtraneousValues: true,
        });

        // expect all data to be transformed (b/c @Expose() is included)
        expect(Object.keys(obj)).toHaveLength(33);

        const errors = await validate(obj);
        // we expect no errors
        expect(errors).toHaveLength(0);
        expect(errors).toMatchSnapshot();
    });
});
