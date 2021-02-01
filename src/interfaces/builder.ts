import { Constructor } from './constructor';

/* A `Builder` transforms typed options and a collection of `PropertyDecorator`
 * into a single `PropertyDecorator`.
 */
export interface Builder {
    decorators: PropertyDecorator[];

    add(...decorators: (PropertyDecorator | undefined)[]): this;

    build(): PropertyDecorator;
}

/* Decorators work with a "flavor" of builder, represented by a constructor for a
 * concrete `Builder` class.
 */
export type BuilderClass = Constructor<Builder>;
