import { createBuilder } from '../../builder';
import { BarOptions, Bar } from './bar.mixin';
import { FooOptions, Foo } from './foo.mixin';

type FooAndBarOptions = FooOptions & BarOptions;
const FooAndBar = Bar(Foo(createBuilder<FooAndBarOptions>()));

describe('mixins', () => {
    it('have access to typed options ', () => {
        const options: FooAndBarOptions = {
            foo: 'foo',
        };
        expect(options).toBeDefined();

        const mixin = new FooAndBar(options);
        expect(mixin).toBeDefined();
        expect(mixin.foo()).toEqual('foo');
        expect(mixin.bar()).toBeUndefined();
    });
});
