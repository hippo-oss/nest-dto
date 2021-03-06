import { IsDate } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { DateOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

const DEFAULT_FORMAT = 'date-time';

export function IsDateRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & DateOptions) => PropertyDecorator {
    return (
        options: Options & DateOptions = {} as Options & DateOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // OpenAPI expresses dates as a string format (either 'date' or 'date-time')
        type: 'string',
        format: options?.format || DEFAULT_FORMAT,
    }, initializers).add(
        ...buildCommonPropertyDecorators(options),

        // should we validate the input string before transforming to a Date object?

        // convert strings to Dates
        TypePropertyDecorator(() => Date),

        // validate data as a Date
        IsDate({ each: !!options.isArray }),
    ).build();
}
