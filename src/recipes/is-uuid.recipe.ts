import { IsUUID } from 'class-validator';

import { BuilderClass, UUIDOptions } from '../interfaces';

export function IsUUIDRecipe<Options extends UUIDOptions>(
    Builder: BuilderClass,
): (options?: Options) => PropertyDecorator {
    return (
        options?: Options,
    ): PropertyDecorator => new Builder({
        ...(options || {}),

        // OpenAPI expresses UUID as a string format
        type: 'string',
        format: 'uuid',
    }).add(
        // validate data as a string
        IsUUID(options?.version),
    ).build();
}
