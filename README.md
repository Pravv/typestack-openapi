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



//  "@typescript-eslint/eslint-plugin": "^2.0.0",
//  "@typescript-eslint/parser": "^2.2.0",
//  "eslint": "^6.2.2",
//  " ": "^2.18.2",
//  "koa2-swagger-ui": "^2.15.3",
// "routing-controllers": "^0.7.7",
// "standard": "^14.1.0",
// "ts-node": "^8.3.0",
// "typescript": "^3.6.2"


//  "ts-morph": "^4.0.0",
//   "lodash": "^4.17.15",
//   "path-to-regexp": "latest",
//   "openapi3-ts": "^1.3.0"

//  "routing-controllers": "^0.7.7"
