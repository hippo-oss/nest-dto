import { composePropertyDecorators } from '../builder';

describe('composePropertyDecorators', () => {
    it('composes multiple property decorators', () => {
        let foo = false;
        let bar = false;

        expect(foo).toEqual(false);
        expect(bar).toEqual(false);

        /* eslint-disable @typescript-eslint/no-unused-vars */
        const toggleFoo: PropertyDecorator = (_target: unknown, _propertyKey: string | symbol) => {
            foo = !foo;
        };

        const toggleBar: PropertyDecorator = (_target: unknown, _propertyKey: string | symbol) => {
            bar = !bar;
        };

        const decorator = composePropertyDecorators([
            toggleFoo,
            toggleBar,
        ]);

        class Fixture {
            @decorator
            public value!: string;
        }
        /* eslint-enable @typescript-eslint/no-unused-vars */

        expect(Fixture).toBeDefined();
        expect(foo).toEqual(true);
        expect(bar).toEqual(true);
    });
});
