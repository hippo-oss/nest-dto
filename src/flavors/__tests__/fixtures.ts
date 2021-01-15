import { DateFormat } from '../../enums';
import { Constructor } from '../../interfaces';

import { BasicFlavor, OpenAPIFlavor } from '..';

export function createFixtures(
    /* It is rather difficult to write `createFixtures()` as a generic function
     * that accepts any flavor of decorators.
     *
     * For example, attempts to add a generic Options options parameter, even one constrained
     * to available mixin options, lead to compiler errors of the form:
     *
     *  "could be instantiated with a different subtype of constraint"
     *
     * because the compiler isn't powerful enough to perform "higher-order" type reasoning.
     *
     * It is, however, easy to allow a union of the flavors we wish to support.
     */
    flavor: BasicFlavor | OpenAPIFlavor,
): Constructor {
    const {
        IsBoolean,
        IsDate,
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

    class Example {
        @IsBoolean()
        requiredBooleanValue!: boolean;

        @IsDate({
            format: DateFormat.DATE,
        })
        requiredDateStringValue!: string;

        @IsDate()
        requiredDateValue!: Date;

        @IsEnum({
            enum: ExampleEnum,
        })
        requiredEnumValue!: ExampleEnum;

        @IsInteger()
        requiredIntegerValue!: number;

        @IsNested({
            nested: NestedRequiredExample,
        })
        requiredNestedValue!: NestedRequiredExample;

        @IsNumber()
        requiredNumberValue!: number;

        @IsString()
        requiredStringValue!: string;

        @IsUUID()
        requiredUUIDValue!: string;

        @IsBoolean({
            optional: true,
        })
        optionalBooleanValue?: boolean;

        @IsDate({
            format: DateFormat.DATE,
            optional: true,
        })
        optionalDateStringValue?: string;

        @IsDate({
            optional: true,
        })
        optionalDateValue?: Date;

        @IsEnum({
            enum: ExampleEnum,
            optional: true,
        })
        optionalEnumValue?: ExampleEnum;

        @IsInteger({
            optional: true,
        })
        optionalIntegerValue?: number;

        @IsNested({
            nested: NestedOptionalExample,
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
    }

    return Example;
}

export const INPUT = {
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
};
