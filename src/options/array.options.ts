import { Type } from '@nestjs/common';

import { ArraySizeOptions, DecoratorOptions } from './decorator.options';

export interface ArrayOptions extends DecoratorOptions, ArraySizeOptions {
    type: Type,
}
