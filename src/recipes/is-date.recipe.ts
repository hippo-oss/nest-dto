import { IsDate, IsISO8601 } from 'class-validator';

import { TypePropertyDecorator } from '../adapters';
import { DateFormat } from '../enums';
import { BuilderClass, DateOptions } from '../interfaces';

const DEFAULT_FORMAT = DateFormat.DATE_TIME;

export function IsDateRecipe<Options extends DateOptions>(
    Builder: BuilderClass<Options>,
): (options?: Options) => PropertyDecorator {
    return function (
        options?: Options,
    ): PropertyDecorator {
        const builder = new Builder({
            ...(options || {}),

            // OpenAPI expresses dates as a string format (either 'date' or 'date-time')
            type: 'string',
            format: options?.format || DEFAULT_FORMAT,
        });

        if (options?.format === DateFormat.DATE_TIME) {
            builder.add(
                // TODO: validate the input string before transforming to a Date object

                // convert strings to Dates
                TypePropertyDecorator(() => Date),

                // validate data as a DateTime
                IsDate(),
            );
        }

        if (options?.format === DateFormat.DATE) {
            builder.add(
                IsISO8601(),
            );
        }

        return builder.build();
    };
}
