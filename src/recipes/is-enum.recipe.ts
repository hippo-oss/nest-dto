import { IsEnum } from 'class-validator';
import 'reflect-metadata';

import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { EnumOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

export function IsEnumRecipe<Options>(
    initializers: Initializer<Options>[],
): (options: Options & EnumOptions) => PropertyDecorator {
    return (
        options: Options & EnumOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        /* While @nestjs/swagger can implement enums without an explicit `enumName`, it will
         * not detect that the same enum is used in multiplace API locations unless a consistent
         * `enumName` is used.
         */
        enum: options.enum,
        enumName: options.enumName,
    }, initializers).add(
        ...buildCommonPropertyDecorators(options),

        // validate data as an enum
        IsEnum(options.enum, { each: !!options.isArray }),
    ).build();
}
