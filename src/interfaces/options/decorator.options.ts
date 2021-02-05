export interface ArraySizeOptions {
    maxItems?: number,
    minItems?: number,
}

export interface DecoratorOptions {
    description?: string,
    isArray?: boolean | ArraySizeOptions,
    nullable?: boolean,
    optional?: boolean,
}
