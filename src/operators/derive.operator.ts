import { Type } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Obj = {};

/* Create a derived DTO class from the `Base` DTO class.
 */
export function derive<T extends Obj>(
    Base: Type<T>,
    name: string,
): Type<T> {
    // NB: anonymous classes are named via their assigned variable
    return {
        [name]: class extends Base {},
    }[name];
}
