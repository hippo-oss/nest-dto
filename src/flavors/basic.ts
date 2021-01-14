/* Defines a basic set of decorators.
 */
import { createBuilder } from '../builder';
import {
    BooleanOptions,
    DateOptions,
    EnumOptions,
    Flavor,
    IntegerOptions,
    NestedOptions,
    NumberOptions,
    StringOptions,
    UUIDOptions,
} from '../interfaces';
import {
    TransformerOptions,
    ValidatorOptions,
    withTransformer,
    withValidator,
} from '../mixins';
import {
    IsBooleanRecipe,
    IsDateRecipe,
    IsEnumRecipe,
    IsIntegerRecipe,
    IsNestedRecipe,
    IsNumberRecipe,
    IsStringRecipe,
    IsUUIDRecipe,
} from '../recipes';

export interface FlavorOptions extends TransformerOptions, ValidatorOptions {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createBuilderWithMixins<Options>() {
    return withTransformer(
        withValidator(
            createBuilder<Options>(),
        ),
    );
}

export const flavor: Flavor<FlavorOptions> = {
    IsBoolean: IsBooleanRecipe(createBuilderWithMixins<FlavorOptions & BooleanOptions>()),
    IsDate: IsDateRecipe(createBuilderWithMixins<FlavorOptions & DateOptions>()),
    IsEnum: IsEnumRecipe(createBuilderWithMixins<FlavorOptions & EnumOptions>()),
    IsInteger: IsIntegerRecipe(createBuilderWithMixins<FlavorOptions & IntegerOptions>()),
    IsNested: IsNestedRecipe(createBuilderWithMixins<FlavorOptions & NestedOptions>()),
    IsNumber: IsNumberRecipe(createBuilderWithMixins<FlavorOptions & NumberOptions>()),
    IsString: IsStringRecipe(createBuilderWithMixins<FlavorOptions & StringOptions>()),
    IsUUID: IsUUIDRecipe(createBuilderWithMixins<FlavorOptions & UUIDOptions>()),
};

export type BasicFlavor = typeof flavor;
