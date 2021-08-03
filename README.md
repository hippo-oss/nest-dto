# nest-dto
 
NestJS DTO decorator composition.


## What Problem Does This Project Solve?

Data transfer objects (DTOs) in the NestJS ecosystem typically rely on decorators from several
libraries, including:

 - [class-transformer](https://github.com/typestack/class-transformer)
 - [class-validator](https://github.com/typestack/class-validator)
 - [@nestjs/swagger](https://github.com/nestjs/swagger)

As a result, a single DTO property often needs to be decorated several times and needs each of
these decorators to be defined consistently. Over the course of a large project with many DTOs,
a large amount of code will be dedicated to these definitions and small inconsistencies often
creep into the definitions.

`nest-dto` provides a simplified set of decorators that compose over the library decorators.


## An Example

A DTO for an HTTP API that generates an [OpenAPI spec](https://swagger.io/specification/) might
need all of the following decorators for a single property:

```ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class ExampleDTO {

    @Type(() => Number)
    @IsDefined()
    @IsInt()
    @ApiProperty({
        description: 'An example value',
        type: integer',
    })
    public value!: number;
}
```

With `nest-dto`, this declaration becomes:

```ts
import { IsInteger } from '@hippo-oss/nest-dto/openapi';


export class ExampleDTO {

    @IsInteger({
        description: 'An example value',
    })
    public value!: number;
}
```

## Flavors

Different combinations of the library decorators produce different behaviors. `nest-dto` defines
collections of foundational decorators (e.g. `IsString` or `IsNumber`) in "flavors" that use
specific combination of these libraries.

| Flavor    | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| `basic`   | Integrates `class-transformer` and `class-validator`                             |
| `strict`  | Integrates `class-transformer` and `class-validator` and always uses `@Expose()` |
| `openapi` | Integrates `class-transformer`, `class-validator`, and `@nestjs/swagger`         |


## Decorators

The following decorators are supported:

| Decorator      | Description                         |
| -------------- | ----------------------------------- |
| `IsArray`      | Declares an array of a nested type. |
| `IsBoolean`    | Declares a boolean value.           |
| `IsDate`       | Declares a `Date` value.            |
| `IsDateString` | Declares an ISO 8601 date string.   |
| `IsEnum`       | Declares an enumerated value.       |
| `IsInteger`    | Declares an integer number.         |
| `IsNested`     | Declares a nested object type.      |
| `IsNumber`     | Declares a floating point number.   |
| `IsString`     | Declares a string.                  |
| `IsUUID`       | Declares a UUID string.             |

### Decorator Options

Decorators may be passed various options, dependening on their type.

All options are optional expect where indicated.

| Option            | Decorator      | Description                                         |
| ----------------- | -------------- | --------------------------------------------------- |
| `description`     | *all*          | Description of the field; exposed in OpenAPI.       |
| `isArray`         | *all*          | Designates and array of values.                     |
| `nullable`        | *all*          | Whether the field can be set to `null`.             |
| `optional`        | *all*          | Whether the field be set to `undefined` or omitted. |
| ----------------- | -------------- | --------------------------------------------------- |
| `type` (required) | `IsArray`      | The type of the array's items.                      |
| `maxItems`        | `IsArray`      | The maximum number of array items.                  |
| `minItems`        | `IsArray`      | The minimum number of array items.                  |
| ----------------- | -------------- | --------------------------------------------------- |
| `format`          | `IsDate`       | The OpenaPI date format; defaults to `date-time`.   |
| ----------------- | -------------- | --------------------------------------------------- |
| `format`          | `IsDateString` | The OpenAPI date format; defaults to `date`.        |
| ----------------- | -------------- | --------------------------------------------------- |
| `enum` (required) | `IsEnum`       | The enum type.                                      |
| `enumName`        | `IsEnum`       | The enum name; required to correctly export OpenAPI |
| ----------------- | -------------- | --------------------------------------------------- |
| `maxValue`        | `IsInteger`    | The maximum value of the field.                     |
| `minValue`        | `IsInteger`    | The minimum value of the field.                     |
| ----------------- | -------------- | --------------------------------------------------- |
| `type` (required) | `IsNested`     | The nested type.                                    |
| ----------------- | -------------- | --------------------------------------------------- |
| `maxValue`        | `IsNumber`     | The maximum value of the field.                     |
| `minValue`        | `IsNumber`     | The minimum value of the field.                     |
| ----------------- | -------------- | --------------------------------------------------- |
| `maxLength`       | `IsString`     | The maximum length of the string.                   |
| `minLength`       | `IsString`     | The minimum length of the string.                   |
| `pattern`         | `IsString`     | A regex pattern for validating the string.          |
| ----------------- | -------------- | --------------------------------------------------- |
| `version`         | `IsUUID`       | The type of UUID.                                   |


### Arrays

The easiest (and preferred) way to define arrays is to add the `isArray` argument to
another decorator:

```ts
class Example {
   @IsString({
       isArray: true,
   })
   values!: string[];
}
```

The `isArray` option may be supplied as either the literal `true` or as `ArraySizeOptions`:

```ts
class Example {
   @IsString({
       isArray: {
           maxSize: 30,
           minSize: 0,
       },
   })
   values!: string[];
}
```

Note that while the `IsArray` decorator is also supported, it is less well-suited for defining
arrays of value types using a consistent interface and may be deprecated in the future.


### Enums

Enumerated types work pretty much as expected:

```ts
enum Color {
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
}

class Example {
   @IsEnum({
      enum: Color,
      enumName: 'Color',
   })
   color!: Color;
}
```

The `enumName` value is optional, but if omitted causes OpenAPI generation to treat the enum
as a value type rather than as `$ref` to a shared type. This choice may matters when generating
code from an OpenAPI spec because most code generators will produce different types for every
enum value, even if they share the same enumerated values. Defining an `enumName` (and therefore
a `$ref` declaration) ensures that generated code sees each use of the same enum as the same type.


### Nested Types

Decorator values that use another object type should be decorated with `IsNested`:

```ts
class Child {
    @IsString()
    value!: string;
}

class Parent {
     @IsNested({
         type: Child,
     })
     child!: Child;
}
```

Every child type is expected to define *at least one* decorator field. Failure to do so may result
in errors from `class-transformer`.
