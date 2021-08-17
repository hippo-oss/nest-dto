import { TransformFnParams } from 'class-transformer';

/* Convert null values to undefined values.
 *
 * Intended for use with `@Transform()` to handle `null` values that should
 * be expressed as `undefined`.
 */
export function nullToUndefined({ value }: TransformFnParams): unknown {
    return value === null ? undefined : value;
}
