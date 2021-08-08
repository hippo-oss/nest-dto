import { Controller, Get, Module, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/* @nestjs/swagger does not expose a mechanism to generation DTO schemas directly.
 *
 * We provide a workaround the generates a single-purpose controller solely to invoke
 * the OpenAPI generation process on its DTO return type.
 */
export function createOpenAPIFixtureModule<T>(DTO: Type<T>): unknown {

    @Controller('/')
    class FixtureController {

        @Get()
        @ApiResponse({
            type: DTO,
        })
        public fixture(): T {
            return new DTO();
        }
    }

    @Module({
        controllers: [
            FixtureController,
        ],
    })
    class FixtureModule { }

    return FixtureModule;
}
