import { InputDecorator } from './input-decorator';

export interface HasInputDecorators {
    decorators: InputDecorator[];

    add(decorator: InputDecorator): this;
}
