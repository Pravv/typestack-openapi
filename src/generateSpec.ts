import * as _ from 'lodash';
import * as oa from 'openapi3-ts';
import * as pathToRegexp from 'path-to-regexp';

import 'reflect-metadata';
import { MetadataArgsStorage } from 'routing-controllers';
import { ParamMetadataArgs } from 'routing-controllers/metadata/args/ParamMetadataArgs';
import { getControllerMethodsTypes, schemas } from './ast';
import { applyOpenAPIDecorator } from './decorators';
import { IRoute } from './index';

let typeInformation;

/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * Convert an Express path into an OpenAPI-compatible path.
 */
export function toOpenAPIPath(expressPath: string) {
  const tokens = pathToRegexp.parse(expressPath);
  return tokens
    .map(d => typeof d === 'string' ? d : `${d.prefix}{${d.name}}`)
    .join('');
}

/* Return full Express path of given route. */
export function getFullExpressPath(route: IRoute): string {
  const { action, controller, options } = route;
  return `${options.routePrefix || ''}${controller.route || ''}${action.route || ''}`;
}

/*
 * Return full OpenAPI-formatted path of given route.
 */
export function getFullPath(route: IRoute): string {
  const z = getFullExpressPath(route);
  const b = toOpenAPIPath(z);
  return b;
}

/*
 * Return OpenAPI Operation object for given route.
 */
export function getOperation(route: IRoute): oa.OperationObject {
  const operation: oa.OperationObject = {
    operationId: getOperationId(route),
    parameters: [
      ...getHeaderParams(route),
      ...getPathParams(route),
      ...getQueryParams(route)
    ],
    requestBody: getRequestBody(route) || undefined,
    responses: getResponses(route),
    summary: getSummary(route),
    tags: getTags(route)
  };

  const cleanedOperation = _.omitBy(operation, _.isEmpty) as oa.OperationObject;
  return applyOpenAPIDecorator(cleanedOperation, route);
}

/**
 * Return OpenAPI Operation ID for given route.
 */
export function getOperationId(route: IRoute) {
  return `${route.action.target.name}.${route.action.method}`;
}

/**
 * Return OpenAPI Paths Object for given routes
 */
export function getPaths(routes: IRoute[]): oa.PathObject {
  const routePaths = routes.map(route => ({ [getFullPath(route)]: { [route.action.type]: getOperation(route) } }));

  return _.merge(...routePaths);
}

/**
 * Return header parameters of given route.
 */
export function getHeaderParams(route: IRoute): oa.ParameterObject[] {
  const headers: oa.ParameterObject[] = _(route.params)
    .filter({ type: 'header' })
    .map(headerMeta => {
      const schema = getParamSchema(headerMeta) as oa.SchemaObject;
      return {
        in: 'header' as oa.ParameterLocation,
        name: headerMeta.name || '',
        required: isRequired(headerMeta, route),
        schema
      };
    })
    .value();

  const headersMeta = _.find(route.params, { type: 'headers' });
  if (headersMeta) {
    const schema = getParamSchema(headersMeta) as oa.ReferenceObject;
    headers.push({
      in: 'header',
      name: _.last(_.split(schema.$ref, '/')) || '',
      required: isRequired(headersMeta, route),
      schema
    });
  }

  return headers;
}

/**
 * Return path parameters of given route.
 *
 * Path parameters are first parsed from the path string itself, and then
 * supplemented with possible @Param() decorator values.
 */
export function getPathParams(route: IRoute): oa.ParameterObject[] {
  const path = getFullExpressPath(route);
  const tokens = pathToRegexp.parse(path);

  return tokens
    .filter(_.isObject) // Omit non-parameter plain string tokens
    .map((token: pathToRegexp.Key) => {
      const name = `${token.name}`;
      const param: oa.ParameterObject = {
        in: 'path',
        name,
        required: !token.optional,
        schema: { type: 'string' }
      };

      const meta = _.find(route.params, { name, type: 'param' });
      if (meta) {
        param.schema = getParamSchema(meta);
      }

      return param;
    });
}

/**
 * Return query parameters of given route.
 */
export function getQueryParams(route: IRoute): oa.ParameterObject[] {
  const queries: oa.ParameterObject[] = _(route.params)
    .filter({ type: 'query' })
    .map(queryMeta => {
      const schema = getParamSchema(queryMeta);
      return {
        in: 'query' as oa.ParameterLocation,
        name: queryMeta.name || '',
        required: isRequired(queryMeta, route),
        schema
      };
    })
    .value();

  const queriesMeta = _.find(route.params, { type: 'queries' });
  if (queriesMeta) {
    const schema = getParamSchema(queriesMeta);
    queries.push({
      in: 'query',
      name: _.last(_.split(schema.$ref, '/')) || '',
      required: isRequired(queriesMeta, route),
      schema
    });
  }

  return queries;
}

/**
 * Return OpenAPI requestBody of given route, if it has one.
 */
export function getRequestBody(route: IRoute): oa.RequestBodyObject | void {
  const bodyParamMetas = route.params.filter(d => d.type === 'body-param');
  const bodyParamsSchema: oa.SchemaObject | null = bodyParamMetas.length > 0
    ? bodyParamMetas.reduce(
      (acc: oa.SchemaObject, d) => ({
        ...acc,
        properties: {
          ...acc.properties,
          [d.name!]: getParamSchema(d)
        },
        required: isRequired(d, route)
          ? [...(acc.required || []), d.name!]
          : acc.required
      }),
      { properties: {}, required: [], type: 'object' }
    )
    : null;

  const bodyMeta = route.params.find(d => d.type === 'body');

  if (bodyMeta) {
    const bodySchema = getParamSchema(bodyMeta);
    const { $ref } = 'items' in bodySchema && bodySchema.items ? bodySchema.items : bodySchema;

    return {
      content: {
        'application/json': {
          schema: bodyParamsSchema
            ? { allOf: [bodySchema, bodyParamsSchema] }
            : bodySchema
        }
      },
      description: _.last(_.split($ref, '/')),
      required: isRequired(bodyMeta, route)
    };
  }

  if (bodyParamsSchema) {
    return { content: { 'application/json': { schema: bodyParamsSchema } } };
  }

  return undefined;
}

/**
 * Return the content type of given route.
 */
export function getContentType(route: IRoute): string {
  const defaultContentType = route.controller.type === 'json'
    ? 'application/json'
    : 'text/html; charset=utf-8';
  const contentMeta = _.find(route.responseHandlers, { type: 'content-type' });
  return contentMeta ? contentMeta.value : defaultContentType;
}

/**
 * Return the status code of given route.
 */
export function getStatusCode(route: IRoute): string {
  const successMeta = _.find(route.responseHandlers, { type: 'success-code' });
  return successMeta ? `${successMeta.value}` : '200';
}

/**
 * Return OpenAPI Responses object of given route.
 */
export function getResponses(route: IRoute): oa.ResponsesObject {
  const controllerName = route.action.target.name;
  const methods = typeInformation.get(controllerName);
  const method = methods.get(route.action.method);
  const returnType = method.returnType.type;

  const contentType = getContentType(route);
  const successStatus = getStatusCode(route);

  return {
    [successStatus]: {
      content: { [contentType]: { schema: returnType } },
      description: 'Successful response'
    }
  };
}

/**
 * Return OpenAPI specification for given routes.
 */
export function getSpec(projectPath, storage: MetadataArgsStorage, routes: IRoute[]): oa.OpenAPIObject {
  typeInformation = getControllerMethodsTypes(storage, projectPath, routes);

  return {
    components: { schemas },
    info: { title: '', version: '1.0.0' },
    openapi: '3.0.0',
    paths: getPaths(routes)
  };
}

/**
 * Return OpenAPI Operation summary string for given route.
 */
export function getSummary(route: IRoute): string {
  return _.capitalize(_.startCase(route.action.method));
}

/**
 * Return OpenAPI tags for given route.
 */
export function getTags(route: IRoute): string[] {
  return [_.startCase(route.controller.target.name.replace(/Controller$/, ''))];
}

/**
 * Return true if given metadata argument is required, checking for global
 * setting if local setting is not defined.
 */
function isRequired(meta: { required?: boolean }, route: IRoute) {
  const globalRequired = _.get(route.options, 'defaults.paramOptions.required');
  return globalRequired ? meta.required !== false : !!meta.required;
}

/**
 * Parse given parameter's OpenAPI Schema or Reference object using metadata
 * reflection.
 */
function getParamSchema(
  param: ParamMetadataArgs
): oa.SchemaObject | oa.ReferenceObject {
  const { object, method, name } = param;
  const controllerName = object.constructor.name;
  const methods = typeInformation.get(controllerName);

  if (name) {
    const paramType = methods.get(method).params.find(x => x.name === name);
    return paramType.type;
  }

  const paramType = methods.get(method).params.find(x => x.decorators.find(d => d.includes('@Body(')));
  return paramType.type;
}

/* eslint-enable @typescript-eslint/no-use-before-define */
