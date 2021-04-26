import { IsBoolean } from 'class-validator';

import { TransformFnParams } from 'class-transformer';
import { TransformPropertyDecorator, TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { BooleanOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

export function IsBooleanRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & BooleanOptions) => PropertyDecorator {
    return (
        options: Options & BooleanOptions = {} as Options & BooleanOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // set type to number
        type: 'boolean',
    }, initializers).add(
        ...buildCommonPropertyDecorators(options),

        // convert strings to boolean
        TypePropertyDecorator(() => Boolean),

        // convert 'false' and '0' to false
        TransformPropertyDecorator(({ obj, key, value }: TransformFnParams) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if ('false'.localeCompare(obj[key], undefined, { sensitivity: 'accent' }) === 0 || obj[key] === '0') {
                return false;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value;
        }),

        // validate data as a boolean
        IsBoolean({ each: !!options.isArray }),
    ).build();
}
