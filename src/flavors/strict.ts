import { composeDecoratorFactories } from '@hippo-oss/dto-decorators';
import { CLASS_DECORATORS } from '@hippo-oss/class-decorators';

export const DECORATORS = composeDecoratorFactories([
    CLASS_DECORATORS,
]);

export const {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
} = DECORATORS;
