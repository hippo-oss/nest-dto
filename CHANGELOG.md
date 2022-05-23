# Changelog

## [Unreleased]

 - Breaking change: removes `omit` operator; we expect all usages to use `pick` exclusively.

## [1.0.0]

 - Breaking change: removes `basic` flavor; we expect all usages to have switched to the `strict` flavor.

 - Breaking change: removes `@IsArray` decorator; we expect all uses to use the `isArray` option of another decorator.

 - Major change: implemention now delegates to `dto-decorators`, `class-decorators`, and `openapi-decorators` for
   a better-architected construction of decorators.
