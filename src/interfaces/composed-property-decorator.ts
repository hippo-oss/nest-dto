/* The composed decorator needs to have a reduced set of inputs in order to be
 * compatable with all of the possible input decorator types, especially those
 * from `class-transformer`.
 */
export type ComposedPropertyDecorator = (target: unknown, propertyKey: string) => void;
