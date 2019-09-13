import { ClassDeclaration, Directory, Project, SourceFile } from 'ts-morph';
import { parseParam, parseReturn } from './functionParse';
import { MetadataArgsStorage } from 'routing-controllers';
import { IRoute } from '../parseMetadata';

function getFiles(directory: Directory) {
  const files = [];
  for (const dir of directory.getDirectories()) files.push(...getFiles(dir));

  return [...directory.getSourceFiles(), ...files];
}

export function getControllersFromFile(file: SourceFile, names: string[]) {
  const classes: ClassDeclaration[] = file.getClasses();
  return classes.filter(c => names.includes(c.getName()));
}

export function getControllersClasses(project: Project, meta: MetadataArgsStorage): ClassDeclaration[] {
  const projectDir = project.getRootDirectories()[0];
  const controllersDir = projectDir.getDirectory(`${projectDir.getPath()}/controllers`);

  const controllersNames = meta.controllers.map(c => c.target as unknown as string);

  const files = getFiles(controllersDir);

  const controllers = [];
  for (const file of files) controllers.push(...getControllersFromFile(file, controllersNames));

  return controllers;
}

function parseMethods(classDeclaration: ClassDeclaration, methodNames: Array<{ route: string; method: string; type: string; target: string }>) {
  const methods = new Map<string, { params; returnType }>();
  for (const { method } of methodNames) {
    const methodDecl = classDeclaration.getMethod(method);

    const params = methodDecl.getParameters().map(parseParam);
    const returnType = parseReturn(methodDecl);

    methods.set(method, { params, returnType });
  }

  return methods;
}

export function parseControllers(meta, classDeclarations: ClassDeclaration[]) {
  const controllers = new Map<string, Map<string, { params; returnType }>>();
  for (const classDecl of classDeclarations) {
    const className = classDecl.getName();

    const methodNames = meta.actions.filter(a => a.target === className);
    const methods = parseMethods(classDecl, methodNames);

    controllers.set(className, methods);
  }

  return controllers;
}
