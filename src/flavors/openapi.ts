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
    SwaggerOptions,
    TransformerOptions,
    ValidatorOptions,
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

export interface FlavorOptions extends SwaggerOptions, TransformerOptions, ValidatorOptions {}

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

export const flavor: Flavor<FlavorOptions> = {
    IsArray: IsArrayRecipe(createBuilderWithMixins<FlavorOptions & ArrayOptions>()),
    IsBoolean: IsBooleanRecipe(createBuilderWithMixins<FlavorOptions & BooleanOptions>()),
    IsDate: IsDateRecipe(createBuilderWithMixins<FlavorOptions & DateOptions>()),
    IsDateString: IsDateStringRecipe(createBuilderWithMixins<FlavorOptions & DateStringOptions>()),
    IsEnum: IsEnumRecipe(createBuilderWithMixins<FlavorOptions & EnumOptions>()),
    IsInteger: IsIntegerRecipe(createBuilderWithMixins<FlavorOptions & IntegerOptions>()),
    IsNested: IsNestedRecipe(createBuilderWithMixins<FlavorOptions & NestedOptions>()),
    IsNumber: IsNumberRecipe(createBuilderWithMixins<FlavorOptions & NumberOptions>()),
    IsString: IsStringRecipe(createBuilderWithMixins<FlavorOptions & StringOptions>()),
    IsUUID: IsUUIDRecipe(createBuilderWithMixins<FlavorOptions & UUIDOptions>()),
};

export type OpenAPIFlavor = typeof flavor;
