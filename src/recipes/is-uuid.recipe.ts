import { IsUUID } from 'class-validator';

import { Builder } from '../builder';
import { Initializer, UUIDOptions } from '../interfaces';

export function IsUUIDRecipe<Options>(
    initializers: Initializer<Options>[],
): (options?: Options & UUIDOptions) => PropertyDecorator {
    return (
        options: Options & UUIDOptions = {} as Options & UUIDOptions,
    ): PropertyDecorator => new Builder({
        ...options,

        // OpenAPI expresses UUID as a string format
        type: 'string',
        format: 'uuid',
    }, initializers).add(
        // validate data as a string
        IsUUID(options?.version),
    ).build();
}
