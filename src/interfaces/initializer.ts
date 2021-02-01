/* A `Initializer` provides zero or more default `PropertyDecorators`.
 */
export type Initializer<Options> = (options: Options) => (PropertyDecorator | undefined)[];
