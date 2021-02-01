import { IsDefined, IsOptional } from 'class-validator';

export interface ValidatorOptions {
    // nullable means that the value type should be "T | null"
    nullable?: boolean;
    // optional means that the value type should be "T | undefined"
    optional?: boolean;
}

export function initializeValidator<Options extends ValidatorOptions>(
    options: Options,
): PropertyDecorator[] {

    const optional = options.optional || options.nullable;
    return [
        optional ? IsOptional() : IsDefined(),
    ];
}
