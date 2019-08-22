import { ClassDeclaration, InterfaceDeclaration, MethodDeclaration, ParameterDeclaration, Project, SourceFile, Type } from 'ts-morph';

import * as util from 'util';
import meta from './meta';

function log(...a) {
  console.log(util.inspect(a, false, null, true));
}

export function getControllerMethodsTypes() {
  const project = new Project();
  project.addExistingSourceFiles('D:\\PROGRAMY\\JS\\rocketLigue\\galaxydrop\\src\\**/*.ts');
  const parsedControllers = new Map<string, Map<string, { params, returnType }>>();
  const files = getControllersClasses(project);
  for (const { controllers, interfaces } of files) {
    const x = parseControllers(controllers);
    x.forEach((v, k) => {parsedControllers.set(k, v);});
  }

  return parsedControllers;
}

getControllerMethodsTypes();

function getControllersClasses(project: Project) {
  const projectDir = project.getRootDirectories()[0];
  const controllers = projectDir.getDirectory(`${projectDir.getPath()}/controllers`);
  return controllers.getSourceFiles().map(getTypesFromFile);
}

function getTypesFromFile(file: SourceFile) {
  const classes = file.getClasses();
  const interfaces = file.getInterfaces();
  const controllers = classes.filter(c => c.getName().includes('Controller'));
  return { classes, interfaces, controllers };
}

function parseControllers(classDeclarations: ClassDeclaration[]) {
  const controllers = new Map<string, Map<string, { params, returnType }>>();
  for (const classDecl of classDeclarations) {
    const className = classDecl.getName();
    const methodNames = meta.actions.filter(a => a.target === className);
    const methods = parseMethods(classDecl, methodNames);

    controllers.set(classDecl.extractInterface().name, methods);
  }

  return controllers;
}

function parseMethods(classDeclaration: ClassDeclaration, methodNames: Array<{ route: string; method: string; type: string; target: string }>) {
  const methods = new Map<string, { params, returnType }>();
  for (const { method } of methodNames) {
    const x = classDeclaration.getMethod(method);
    const params = x.getParameters().map(parseParam);

    const returnType = parseReturn(x);
    console.log(method, returnType);
    const result = { params, returnType };
    methods.set(method, result);
  }

  return methods;
}

/*
 User:
 type: object
 properties:
 id:
 type: integer
 name:
 type: string
 contact_info:
 $ref: '#/components/schemas/ContactInfo'
 */

function toSchema(symbol) {
  const members = symbol.getMembers();
  const ret = { [symbol.getName()]: { type: 'object' } };

  const properties = {};
  for (const prop of symbol.getProperties()) {
    properties[prop.getName()] = importToType(prop);
  }
  return symbol;
}

function importToType(type: Type) {
  if (type.isArray()) type = type.getArrayElementType();
  if (!type.isClassOrInterface()) return { type: type.getText() };

  const className = type.getSymbol().getEscapedName();

  const x = type.getSymbol();
  x.getMembers();
  toSchema(x);

  return { $ref: `#/components/schemas/${className}` };
}

function parseParam(x: ParameterDeclaration) {
  const type = x.getType();
  const typeText = importToType(type);

  const decorators = x.getDecorators().map(x => x.getText());

  if (type.isArray()) {
    return { name: x.getName(), type: { items: typeText, type: 'array' } };
  }
  return { name: x.getName(), type: typeText, decorators };
}

function parseReturn(x: MethodDeclaration) {
  const typeReturn = x.getReturnType();
  const typeReturnUnwrapped = unwrapIfPromise(typeReturn);

  if (typeReturnUnwrapped.isArray()) {
    return { type: { items: importToType(typeReturnUnwrapped), type: 'array' } };
  }
  return { type: importToType(typeReturnUnwrapped) };

}

function unwrapIfPromise(type: Type) {
  if (type.getSymbol().getEscapedName() === 'Promise') {
    return type.getTypeArguments()[0];
  }

  return type;
}

function printInterfaces(interfaceDeclarations: InterfaceDeclaration[]) {
  for (const interfaceDeclaration of interfaceDeclarations) log(interfaceDeclaration.getStructure().name);
}
