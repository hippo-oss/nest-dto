/* A `BuilderInitializer` provides zero or default `PropertyDecorators`.
 */
export type BuilderInitializer<Options> = (options: Options) => PropertyDecorator[];
