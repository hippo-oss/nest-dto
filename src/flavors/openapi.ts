/* Defines a flavor of decorators appropriate for `@nestjs/swagger` declarations.
 */
import {
    initializeSwagger,
    initializeTransformer,
    initializeValidator,
    SwaggerOptions,
    TransformerOptions,
    ValidatorOptions,
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

const initializers = [
    initializeSwagger,
    initializeTransformer,
    initializeValidator,
];

type FlavorOptions = SwaggerOptions & TransformerOptions & ValidatorOptions;

export const IsArray = IsArrayRecipe<FlavorOptions>(initializers);
export const IsBoolean = IsBooleanRecipe<FlavorOptions>(initializers);
export const IsDate = IsDateRecipe<FlavorOptions>(initializers);
export const IsDateString = IsDateStringRecipe<FlavorOptions>(initializers);
export const IsEnum = IsEnumRecipe<FlavorOptions>(initializers);
export const IsInteger = IsIntegerRecipe<FlavorOptions>(initializers);
export const IsNested = IsNestedRecipe<FlavorOptions>(initializers);
export const IsNumber = IsNumberRecipe<FlavorOptions>(initializers);
export const IsString = IsStringRecipe<FlavorOptions>(initializers);
export const IsUUID = IsUUIDRecipe<FlavorOptions>(initializers);
