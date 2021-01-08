import { WithOptions } from '..';
import { BarOptions, Bar } from './bar';
import { FooOptions, Foo } from './foo';

type FooAndBarOptions = FooOptions & BarOptions;
const FooAndBar = Bar(Foo(WithOptions<FooAndBarOptions>()));

describe('mixins', () => {
    it('have access to typed options ', () => {
        const mixin = new FooAndBar({
            foo: 'foo',
        });
        expect(mixin).toBeDefined();
        expect(mixin.foo()).toEqual('foo');
        expect(mixin.bar()).toBeUndefined();
    });
});
