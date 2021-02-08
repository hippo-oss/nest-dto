// eslint-disable-next-line @typescript-eslint/ban-types
export type ValidateOptions = Function;

export interface ArraySizeOptions {
    maxItems?: number,
    minItems?: number,
}

export interface DecoratorOptions {
    description?: string,
    isArray?: boolean | ArraySizeOptions,
    nullable?: boolean,
    optional?: boolean,
    validate?: ValidateOptions,
}
