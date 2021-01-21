import { Constructor } from '../constructor';

export interface NestedOptions {
    nullable?: boolean,
    optional?: boolean,
    type: Constructor,
}
