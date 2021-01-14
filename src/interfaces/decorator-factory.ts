/* The final decorator types are actually factories that accept typed options.
 */
export type DecoratorFactory<Options> = (options: Options) => PropertyDecorator;

/* The final decorator types are actually factories that accept typed options.
 */
export type DecoratorFactoryOptional<Options> = (options?: Options) => PropertyDecorator;
