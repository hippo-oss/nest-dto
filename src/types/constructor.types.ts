/* The recommended TypeScript mixin pattern depends on having a Constructor type.
 *
 * See: https://www.typescriptlang.org/docs/handbook/mixins.html
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export interface Constructor<T = {}> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
}
