import { Type } from '@nestjs/common';

import { DecoratorOptions } from './decorator.options';

export interface NestedOptions extends DecoratorOptions {
    type: Type,
}
