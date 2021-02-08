import { IsUUID } from 'class-validator';

import { Builder } from '../builder';
import { Initializer } from '../interfaces';
import { UUIDOptions } from '../options';
import { buildCommonPropertyDecorators } from './common.recipe';

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
        ...buildCommonPropertyDecorators(options),

        // validate data as a string
        IsUUID(options?.version, { each: !!options.isArray }),
    ).build();
}
