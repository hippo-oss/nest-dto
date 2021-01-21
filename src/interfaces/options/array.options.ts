import { Constructor } from '../constructor';

export interface ArrayOptions {
    type: Constructor,
    maxItems?: number,
    minItems?: number,
    nullable?: boolean,
    optional?: boolean,
}
