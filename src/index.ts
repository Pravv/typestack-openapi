import 'reflect-metadata';
import * as _ from 'lodash';
import * as oa from 'openapi3-ts';
import { MetadataArgsStorage } from 'routing-controllers';

import { getSpec } from './generateSpec';
import { parseRoutes } from './parseMetadata';
import { getControllerMethodsTypes } from './ast';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { schemas, endpointTypesInfo } from './helpers/magazine';

export * from './decorators';
export * from './generateSpec';
export * from './parseMetadata';

export function routingControllersToSpec(projectPath: string, storage: MetadataArgsStorage, additionalProperties: Partial<oa.OpenAPIObject> = {}): oa.OpenAPIObject {
  const routes = parseRoutes(storage);

  endpointTypesInfo = getControllerMethodsTypes(storage, projectPath, routes);

  const spec = getSpec(routes, schemas);

  endpointTypesInfo = null;

  schemas = null;

  return _.merge(spec, additionalProperties);
}
