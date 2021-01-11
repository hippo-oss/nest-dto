import { IsEnum as IsEnumValidator } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';

export interface EnumOptions {
    enum: Record<string, unknown>,
    enumName?: string;
}

export function IsEnum<Options extends EnumOptions>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    const defaultEnumName = options.enum.constructor.name;

    return new Builder({
        ...options,

        /* While @nestjs/swagger can implement enums without an explicit `enumName`, it will
         * not detect that the same enum is used in multiplace API locations unless a consistent
         * `enumName` is used.
         */
        enum: options.enum,
        enumName: options.enumName || defaultEnumName,
    }).add(
        // validate data as an enum
        IsEnumValidator(options.enum),
    ).build();
}
