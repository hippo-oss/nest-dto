import { BuilderClass } from './property-decorator-builder';

/* The final decorator types are actually factories that accept typed options.
 */
export type DecoratorFactory<Options> = (options: Options) => PropertyDecorator;

/* The type-aware decorators (e.g. `IsInteger`) are actually factories for decorator factories.
 */
export type DecoratorFactoryFactory<Options> = (Builder: BuilderClass<Options>) => DecoratorFactory<Options>;
