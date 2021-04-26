import { Type } from '@nestjs/common';
import { Flavor } from '../../interfaces';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Fixture = Type<{}>;

export function createFixtures(flavor: Flavor): Fixture {
    const {
        IsArray,
        IsBoolean,
        IsDate,
        IsDateString,
        IsEnum,
        IsInteger,
        IsNested,
        IsNumber,
        IsString,
        IsUUID,
    } = flavor;

    enum ExampleEnum {
        Value = 'Value',
    }

    class NestedRequiredExample {
        @IsString()
        requiredStringValue!: string;
    }

    class NestedOptionalExample {
        @IsString()
        optionalStringValue?: string;
    }

    class NestedNullableExample {
        @IsString()
        nullableStringValue!: string | null;
    }

    class Example {
        /* Create one property of each type that is required. */

        @IsArray({
            type: NestedRequiredExample,
        })
        requiredObjectArrayValue!: NestedRequiredExample[];

        @IsArray({
            type: Number,
        })
        requiredPrimitiveArrayValue!: number[];

        @IsBoolean()
        falseBooleanValue!: boolean;

        @IsBoolean()
        zeroBooleanValue!: boolean;

        @IsBoolean()
        requiredBooleanValue!: boolean;

        @IsDateString()
        requiredDateStringValue!: string;

        @IsDate()
        requiredDateValue!: Date;

        @IsEnum({
            enum: ExampleEnum,
            enumName: 'Example',
        })
        requiredEnumValue!: ExampleEnum;

        @IsInteger()
        requiredIntegerValue!: number;

        @IsNested({
            type: NestedRequiredExample,
        })
        requiredNestedValue!: NestedRequiredExample;

        @IsNumber()
        requiredNumberValue!: number;

        @IsString()
        requiredStringValue!: string;

        @IsUUID()
        requiredUUIDValue!: string;

        /* Create one property of each type that is optional. */

        @IsArray({
            type: NestedOptionalExample,
            optional: true,
        })
        optionalObjectArrayValue?: NestedOptionalExample[];

        @IsArray({
            type: Number,
            optional: true,
        })
        optionalPrimitiveArrayValue?: number[];

        @IsBoolean({
            optional: true,
        })
        optionalBooleanValue?: boolean;

        @IsDateString({
            optional: true,
        })
        optionalDateStringValue?: string;

        @IsDate({
            optional: true,
        })
        optionalDateValue?: Date;

        @IsEnum({
            enum: ExampleEnum,
            enumName: 'Example',
            optional: true,
        })
        optionalEnumValue?: ExampleEnum;

        @IsInteger({
            optional: true,
        })
        optionalIntegerValue?: number;

        @IsNested({
            type: NestedOptionalExample,
            optional: true,
        })
        optionalNestedValue?: NestedOptionalExample;

        @IsNumber({
            optional: true,
        })
        optionalNumberValue?: number;

        @IsString({
            optional: true,
        })
        optionalStringValue?: string;

        @IsUUID({
            optional: true,
        })
        optionalUUIDValue?: string;

        /* Create one property of each type that is nullable. */

        @IsArray({
            type: NestedNullableExample,
            nullable: true,
        })
        nullableObjectArrayValue!: NestedNullableExample[] | null;

        @IsArray({
            type: Number,
            nullable: true,
        })
        nullablePrimitiveArrayValue!: number[] | null;

        @IsBoolean({
            nullable: true,
        })
        nullableBooleanValue!: boolean | null;

        @IsDateString({
            nullable: true,
        })
        nullableDateStringValue!: string | null;

        @IsDate({
            nullable: true,
        })
        nullableDateValue!: Date | null;

        @IsEnum({
            enum: ExampleEnum,
            enumName: 'Example',
            nullable: true,
        })
        nullableEnumValue!: ExampleEnum | null;

        @IsInteger({
            nullable: true,
        })
        nullableIntegerValue!: number | null;

        @IsNested({
            type: NestedNullableExample,
            nullable: true,
        })
        nullableNestedValue!: NestedNullableExample | null;

        @IsNumber({
            nullable: true,
        })
        nullableNumberValue!: number | null;

        @IsString({
            nullable: true,
        })
        nullableStringValue!: string | null;

        @IsUUID({
            nullable: true,
        })
        nullableUUIDValue!: string | null;
    }

    return Example;
}

export const INPUT = {
    requiredObjectArrayValue: [
        {
            requiredStringValue: 'nested',
        },
    ],
    requiredPrimitiveArrayValue: [
        '42',
    ],
    falseBooleanValue: 'false',
    zeroBooleanValue: '0',
    requiredBooleanValue: 'true',
    requiredDateStringValue: '2021-01-12',
    requiredDateValue: '2021-01-12T01:12:38.956Z',
    requiredEnumValue: 'Value',
    requiredIntegerValue: '42',
    requiredNestedValue: {
        requiredStringValue: 'nested',
    },
    requiredNumberValue: '42.0',
    requiredStringValue: 'value',
    requiredUUIDValue: '3430cef4-6e7a-43da-a5a7-ae4c6a18be47',

    optionalObjectArrayValue: [
        {
            optionalStringValue: 'nested',
        },
    ],
    optionalPrimitiveArrayValue: [
        '42',
    ],
    optionalBooleanValue: 'true',
    optionalDateStringValue: '2021-01-12',
    optionalDateValue: '2021-01-12T01:12:38.956Z',
    optionalEnumValue: 'Value',
    optionalIntegerValue: '42',
    optionalNestedValue: {
        optionalStringValue: 'nested',
    },
    optionalNumberValue: '42.0',
    optionalStringValue: 'value',
    optionalUUIDValue: '3430cef4-6e7a-43da-a5a7-ae4c6a18be47',

    nullableObjectArrayValue: [
        {
            nullableStringValue: 'nested',
        },
    ],
    nullablePrimitiveArrayValue: [
        '42',
    ],
    nullableBooleanValue: 'true',
    nullableDateStringValue: '2021-01-12',
    nullableDateValue: '2021-01-12T01:12:38.956Z',
    nullableEnumValue: 'Value',
    nullableIntegerValue: '42',
    nullableNestedValue: {
        nullableStringValue: 'nested',
    },
    nullableNumberValue: '42.0',
    nullableStringValue: 'value',
    nullableUUIDValue: '3430cef4-6e7a-43da-a5a7-ae4c6a18be47',
};
