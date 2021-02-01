/* Defines a flavor of decorators appropriate for `@nestjs/swagger` declarations.
 */
import { createBuilder } from '../builder';
import {
    ArrayOptions,
    BooleanOptions,
    DateOptions,
    DateStringOptions,
    EnumOptions,
    IntegerOptions,
    NestedOptions,
    NumberOptions,
    StringOptions,
    UUIDOptions,
} from '../interfaces';
import {
    initializeSwagger,
    initializeTransformer,
    initializeValidator,
} from '../initializers';
import {
    IsArrayRecipe,
    IsBooleanRecipe,
    IsDateRecipe,
    IsDateStringRecipe,
    IsEnumRecipe,
    IsIntegerRecipe,
    IsNestedRecipe,
    IsNumberRecipe,
    IsStringRecipe,
    IsUUIDRecipe,
} from '../recipes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createBuilderWithMixins<Options>() {
    return createBuilder<Options>(
        initializeSwagger,
        initializeTransformer,
        initializeValidator,
    );
}

export const IsArray = IsArrayRecipe(createBuilderWithMixins<ArrayOptions>());
export const IsBoolean = IsBooleanRecipe(createBuilderWithMixins<BooleanOptions>());
export const IsDate = IsDateRecipe(createBuilderWithMixins<DateOptions>());
export const IsDateString = IsDateStringRecipe(createBuilderWithMixins<DateStringOptions>());
export const IsEnum = IsEnumRecipe(createBuilderWithMixins<EnumOptions>());
export const IsInteger = IsIntegerRecipe(createBuilderWithMixins<IntegerOptions>());
export const IsNested = IsNestedRecipe(createBuilderWithMixins<NestedOptions>());
export const IsNumber = IsNumberRecipe(createBuilderWithMixins<NumberOptions>());
export const IsString = IsStringRecipe(createBuilderWithMixins<StringOptions>());
export const IsUUID = IsUUIDRecipe(createBuilderWithMixins<UUIDOptions>());
