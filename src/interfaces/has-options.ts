/* Something that contains a specific type of options.
 *
 * Allows mixins to require their own options type.
 */
export interface HasOptions<Options> {
    options: Options;
}
