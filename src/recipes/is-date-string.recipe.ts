import { IsDateString } from 'class-validator';

import { BuilderClass, DateStringOptions } from '../interfaces';

const FORMAT = 'date';

export function IsDateStringRecipe<Options extends DateStringOptions>(
    Builder: BuilderClass<Options>,
): (options?: Options) => PropertyDecorator {
    return (
        options?: Options,
    ): PropertyDecorator => new Builder({
        ...(options || {}),

        // OpenAPI expresses dates as a string format (either 'date' or 'date-time')
        type: 'string',
        format: FORMAT,
    }).add(
        // validate data as a DateString
        IsDateString(),
    ).build();
}
