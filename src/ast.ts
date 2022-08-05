import { cloneDeep } from 'lodash';
import * as path from 'path';
import { MetadataArgsStorage } from 'routing-controllers';
import { Project } from 'ts-morph';
import { getControllersClasses, parseControllers } from './helpers/FileParse';
import { IRoute } from './parseMetadata';

function normalizeMeta(metaStorage): MetadataArgsStorage {
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

export function getControllerMethodsTypes(storage: MetadataArgsStorage, projectPath: string, routes: IRoute[]) {
  const meta = normalizeMeta(storage);

  const project = new Project();
  project.addExistingSourceFiles(path.join(projectPath, '**/*.ts'));

  const controllers = getControllersClasses(project, meta);

  return parseControllers(meta, controllers);
}
