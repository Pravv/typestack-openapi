import { ClassDeclaration, Project, SourceFile } from 'ts-morph';
import { parseParam, parseReturn } from './functionParse';

export function getTypesFromFile(file: SourceFile) {
  const classes = file.getClasses();
  const interfaces = file.getInterfaces();
  const controllers = classes.filter(c => c.getName().includes('Controller'));
  return { classes, interfaces, controllers };
}

export function getControllersClasses(project: Project) {
  const projectDir = project.getRootDirectories()[0];
  const controllers = projectDir.getDirectory(`${projectDir.getPath()}/controllers`);

  const files = [];
  for (const dir of controllers.getDirectories()) {
    files.push(...dir.getSourceFiles());
  }
  files.push(...controllers.getSourceFiles());

  return files.map(getTypesFromFile);
}

export function parseControllers(meta, classDeclarations: ClassDeclaration[]) {
  const controllers = new Map<string, Map<string, { params; returnType }>>();
  for (const classDecl of classDeclarations) {
    const className = classDecl.getName();
    const methodNames = meta.actions.filter(a => a.target === className);
    const methods = parseMethods(classDecl, methodNames);

    controllers.set(classDecl.extractInterface().name, methods);
  }

  return controllers;
}

function parseMethods(classDeclaration: ClassDeclaration, methodNames: Array<{ route: string; method: string; type: string; target: string }>) {
  const methods = new Map<string, { params; returnType }>();
  for (const { method } of methodNames) {
    const x = classDeclaration.getMethod(method);
    const params = x.getParameters().map(parseParam);

    const returnType = parseReturn(x);

    const result = { params, returnType };
    methods.set(method, result);
  }

  return methods;
}
