import { Project } from 'ts-morph';

import { cloneDeep } from 'lodash';
import { MetadataArgsStorage } from 'routing-controllers';
import * as util from 'util';
import { getControllersClasses, parseControllers } from './helpers/controllersParse';
import * as path from 'path';

function normalizeMeta(metaStorage) {
  const storage = cloneDeep(metaStorage);
  for (const key of Object.keys(storage)) {
    storage[key] = storage[key].map(v => {
      if (v.target) v.target = v.target.name;
      if (v.middleware) v.middleware = v.middleware.name;
      if (v.object) v.object = v.object.constructor.name;

      return v;
    });
  }

  return storage;
}

export const schemas = { Date: { type: 'object' } };

function log(...a) {
  console.log(util.inspect(a, false, null, true));
}

export function getControllerMethodsTypes(storage: MetadataArgsStorage, projectPath: string) {
  const meta = normalizeMeta(storage);

  const project = new Project();
  project.addExistingSourceFiles(path.join(projectPath, '**/*.ts'));
  const parsedControllers = new Map<string, Map<string, { params, returnType }>>();
  const files = getControllersClasses(project);
  for (const { controllers } of files) {
    const x = parseControllers(meta, controllers);
    x.forEach((v, k) => {parsedControllers.set(k, v);});
  }

  log(schemas);

  return parsedControllers;
}
