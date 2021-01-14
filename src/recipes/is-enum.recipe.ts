import { IsEnum } from 'class-validator';

import { BuilderClass, EnumOptions } from '../interfaces';

export function IsEnumRecipe<Options extends EnumOptions>(
    Builder: BuilderClass<Options>,
): (options: Options) => PropertyDecorator {
    return (
        options: Options,
    ): PropertyDecorator => new Builder({
        ...options,

        /* While @nestjs/swagger can implement enums without an explicit `enumName`, it will
         * not detect that the same enum is used in multiplace API locations unless a consistent
         * `enumName` is used.
         */
        enum: options.enum,
        enumName: options.enumName || options.enum.constructor.name,
    }).add(
        // validate data as an enum
        IsEnum(options.enum),
    ).build();
}
