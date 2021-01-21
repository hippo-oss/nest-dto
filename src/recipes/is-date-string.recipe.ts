import { IsISO8601 } from 'class-validator';

import { BuilderClass, DateStringOptions } from '../interfaces';

const DEFAULT_FORMAT = 'date';

export function IsDateStringRecipe<Options extends DateStringOptions>(
    Builder: BuilderClass<Options>,
): (options?: Options) => PropertyDecorator {
    return (
        options?: Options,
    ): PropertyDecorator => new Builder({
        ...(options || {}),

        // OpenAPI expresses dates as a string format (either 'date' or 'date-time')
        type: 'string',
        format: options?.format || DEFAULT_FORMAT,
    }).add(
        // validate data as a DateString
        IsISO8601(),
    ).build();
}
