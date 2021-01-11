import { IsDate as IsDateValidator } from 'class-validator';

import { Constructor, PropertyDecoratorBuilder } from '../interfaces';
import { TypePropertyDecorator } from '../mixins';

export interface DateOptions {
    format?: string,
}

export function IsDate<Options extends DateOptions>(
    options: Options,
    Builder: Constructor<PropertyDecoratorBuilder<Options>>,
): PropertyDecorator {

    // TODO: differentate date and date time decorators?
    const defaultFormat = 'date-time';

    return new Builder({
        ...options,

        // OpenAPI expresses dates as a string format (either 'date' or 'date-time')
        type: 'string',
        format: options.format || defaultFormat,
    }).add(
        // TODO: validate the input string before transforming to a Date object

        // convert strings to Dates
        TypePropertyDecorator(() => Date),

        // validate data as a Date
        IsDateValidator(),
    ).build();
}
