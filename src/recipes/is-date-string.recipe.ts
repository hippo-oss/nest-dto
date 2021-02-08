import { IsISO8601 } from 'class-validator';

import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { DateStringOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

const DEFAULT_FORMAT = 'date';

export function IsDateStringRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & DateStringOptions) => PropertyDecorator {
    return (
        options: Options & DateStringOptions = {} as Options & DateStringOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // OpenAPI expresses dates as a string format (either 'date' or 'date-time')
        type: 'string',
        format: options?.format || DEFAULT_FORMAT,
    }, initializers).add(
        ...buildCommonPropertyDecorators(options),

        // validate data as a DateString
        IsISO8601({}, { each: !!options.isArray }),
    ).build();
}
