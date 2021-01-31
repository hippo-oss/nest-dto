import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import * as basic from '../basic';
import { INPUT, createFixtures } from './fixtures';

describe('flavors.basic', () => {
    const Example = createFixtures(basic);

    it('validates required fields', async () => {
        const obj = plainToClass(Example, {});

        // we do not expect any data to be transformed
        expect(Object.keys(obj)).toHaveLength(0);
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
    it('does not transform input data if extraneous values are excluded', async () => {
        const obj = plainToClass(Example, INPUT, {
            excludeExtraneousValues: true,
        });

        // expect no data to be transformed (b/c @Expose() is not included)
        expect(Object.keys(obj)).toHaveLength(0);

        const errors = await validate(obj);
        // we expect an error for every required field (but not the optional ones)
        expect(errors).toHaveLength(11);
        expect(errors).toMatchSnapshot();
    });
});
