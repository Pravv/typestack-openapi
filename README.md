## About
Leverages Typescript compiler to gather information about types of request and response payloads. 
It's a pro not suited to be used in production.  
based on https://github.com/epiphone/routing-controllers-openapi

## Current Limitations
- `@Param('name')`, `@QueryParam('name')`, `@BodyParam('name')` must match argument names.
```ts
@Get(/:id)
getUser(@QueryParam('id') userId: number){} // doesn't work
```

- [class-transformer](https://github.com/typestack/class-transformer) decorators are ignored.
- Quite slow

