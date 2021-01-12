/* Defines a basic set of decorators.
 */
import { createBuilder } from '../builder-factory';
import {
    IsBooleanFactory,
    IsDateFactory,
    IsEnumFactory,
    IsIntegerFactory,
    IsNestedFactory,
    IsNumberFactory,
    IsStringFactory,
    IsUUIDFactory,
} from '../factories';
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
    IsBoolean: IsBooleanFactory(createBuilderWithMixins<FlavorOptions & BooleanOptions>()),
    IsDate: IsDateFactory(createBuilderWithMixins<FlavorOptions & DateOptions>()),
    IsEnum: IsEnumFactory(createBuilderWithMixins<FlavorOptions & EnumOptions>()),
    IsInteger: IsIntegerFactory(createBuilderWithMixins<FlavorOptions & IntegerOptions>()),
    IsNested: IsNestedFactory(createBuilderWithMixins<FlavorOptions & NestedOptions>()),
    IsNumber: IsNumberFactory(createBuilderWithMixins<FlavorOptions & NumberOptions>()),
    IsString: IsStringFactory(createBuilderWithMixins<FlavorOptions & StringOptions>()),
    IsUUID: IsUUIDFactory(createBuilderWithMixins<FlavorOptions & UUIDOptions>()),
};

export type BasicFlavor = typeof flavor;
