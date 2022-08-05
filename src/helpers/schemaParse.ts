import { Decorator, SyntaxKind, Type } from 'ts-morph';
import { parseType, unwrapType } from './typeParse';
import { schemas } from './magazine';

function parsePropertyType(propType: Type, chainOfTypes: string[]) {
  const propTypeName = propType.isClassOrInterface() ? propType.getSymbol().getEscapedName() : '';

  if (propType.isClassOrInterface() && chainOfTypes.includes(propTypeName)) {
    return { $ref: `#/components/schemas/${propTypeName}` };
  }

  return parseType(propType, chainOfTypes);
}

function parseDecorator(decorator: Decorator) {

}

export function toSchema(type: Type, chainOfTypes: string[]) {
  const symbol = type.getSymbol();
  if (schemas[symbol.getEscapedName()]) return schemas[symbol.getEscapedName()];
  const properties = {};
  for (const prop of type.getProperties()) {
    const declaration = prop.getValueDeclaration();
    // const decorators = declaration.compilerNode.decorators;

    // for (const decorator of decorators) {
    // @ts-ignore
    // console.log(decorator.expression.arguments);
    // }

    if ([SyntaxKind.MethodDeclaration].includes(declaration.getKind())) continue;

    const propType = unwrapType(declaration.getType());

    const parsedPropertyType = parsePropertyType(propType, chainOfTypes);

    properties[prop.getEscapedName()] = propType.isArray()
      ? { items: parsedPropertyType, type: 'array' }
      : parsedPropertyType;
  }

  schemas[symbol.getEscapedName()] = { type: 'object', properties };

  return { type: 'object', properties };
}
