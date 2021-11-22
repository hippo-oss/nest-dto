// eslint-disable-next-line @typescript-eslint/ban-types
export type ValidateOptions = Function;

export interface ArraySizeOptions {
    maxItems?: number,
    minItems?: number,
}

export interface DecoratorOptions {
    description?: string,
    example?: unknown,
    isArray?: boolean | ArraySizeOptions,
    name?: string,
    nullable?: boolean,
    optional?: boolean,
    validate?: ValidateOptions,
}
