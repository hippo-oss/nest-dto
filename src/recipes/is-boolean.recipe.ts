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
        TransformPropertyDecorator(({ obj, key, value }: TransformFnParams): unknown => {
            /* NB: by the time this function is called, the @Type() decorator will have already converted
             * the orginal value to boolean, so we must recover the original value; in additional, decorator
             * order has no impact on this behavior because class-transformer saves decorator logic as
             * reflect-metadata and evaluates it using its own ordering logic.
             */
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const originalValue = obj[key] as unknown;

            if (typeof originalValue === 'string') {
                if (originalValue === '0') {
                    return false;
                }
                if ('false'.localeCompare(originalValue, undefined, { sensitivity: 'base' }) === 0) {
                    return false;
                }
            }

            return value as unknown;
        }),

        // validate data as a boolean
        IsBoolean({ each: !!options.isArray }),
    ).build();
}
