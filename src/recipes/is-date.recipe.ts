import { IsDate } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { BuilderClass, DateOptions } from '../interfaces';

// TODO: differentiate date and date time decorators?
const DEFAULT_FORMAT = 'date-time';

export function IsDateRecipe<Options extends DateOptions>(
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
        // TODO: validate the input string before transforming to a Date object

        // convert strings to Dates
        TypePropertyDecorator(() => Date),

        // validate data as a Date
        IsDate(),
    ).build();
}
