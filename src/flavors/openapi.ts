/* Defines a flavor of decorators appropriate for `@nestjs/swagger` declarations.
 */
import { createBuilder } from '../builder';
import {
    ArrayOptions,
    BooleanOptions,
    DateOptions,
    DateStringOptions,
    EnumOptions,
    Flavor,
    IntegerOptions,
    NestedOptions,
    NumberOptions,
    StringOptions,
    UUIDOptions,
} from '../interfaces';
import {
    withSwagger,
    withTransformer,
    withValidator,
} from '../mixins';
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
    return withSwagger(
        withTransformer(
            withValidator(
                createBuilder<Options>(),
            ),
        ),
    );
}

export const flavor: Flavor = {
    IsArray: IsArrayRecipe(createBuilderWithMixins<ArrayOptions>()),
    IsBoolean: IsBooleanRecipe(createBuilderWithMixins<BooleanOptions>()),
    IsDate: IsDateRecipe(createBuilderWithMixins<DateOptions>()),
    IsDateString: IsDateStringRecipe(createBuilderWithMixins<DateStringOptions>()),
    IsEnum: IsEnumRecipe(createBuilderWithMixins<EnumOptions>()),
    IsInteger: IsIntegerRecipe(createBuilderWithMixins<IntegerOptions>()),
    IsNested: IsNestedRecipe(createBuilderWithMixins<NestedOptions>()),
    IsNumber: IsNumberRecipe(createBuilderWithMixins<NumberOptions>()),
    IsString: IsStringRecipe(createBuilderWithMixins<StringOptions>()),
    IsUUID: IsUUIDRecipe(createBuilderWithMixins<UUIDOptions>()),
};
