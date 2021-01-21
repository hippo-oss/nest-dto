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
import { openapi } from '@hippo-oss/nest-dto';


export class ExampleDTO {

    @openapi.IsInteger({
        description: 'An example value',
    })
    public value!: number;
}
```
