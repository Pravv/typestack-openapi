## About
Leverages Typescript compiler to gather information about types of request and response payloads. 
It's a PoC not suited for production usage.  
based on https://github.com/epiphone/routing-controllers-openapi

## Current Limitations
- `@Param('name')`, `@QueryParam('name')`, `@BodyParam('name')` must match argument names.
```ts
@Get(/:id)
getUser(@QueryParam('id') userId: number){} // doesn't work
```

- [class-transformer](https://github.com/typestack/class-transformer) decorators are ignored.
- Quite slow

