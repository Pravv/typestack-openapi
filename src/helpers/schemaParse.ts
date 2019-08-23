import { SyntaxKind, Type } from 'ts-morph';
import { schemas } from '../ast';
import { parseType, unwrapType } from './typeParse';

function parsePropertyType(propType: Type, chainOfTypes: string[]) {
  const propTypeName = propType.isClassOrInterface() ? propType.getSymbol().getEscapedName() : '';

  if (propType.isClassOrInterface() && chainOfTypes.includes(propTypeName)) {
    return { $ref: `#/components/schemas/${propTypeName}` };
  }

  return parseType(propType, chainOfTypes);
}

export function toSchema(type: Type, chainOfTypes: string[]) {
  const symbol = type.getSymbol();
  if (schemas[symbol.getEscapedName()]) return;

  const properties = {};
  for (const prop of type.getProperties()) {
    const propTypeKind = prop.getValueDeclaration().getKind();
    if ([SyntaxKind.MethodDeclaration /*SyntaxKind.GetAccessor*/].includes(propTypeKind)) continue;

    const propType = unwrapType(prop.getDeclarations()[0].getType());

    const parsedPropertyType = parsePropertyType(propType, chainOfTypes);

    properties[prop.getEscapedName()]
      = propType.isArray()
      ? { items: parsedPropertyType, type: 'array' }
      : parsedPropertyType;
  }

  schemas[symbol.getEscapedName()] = { type: 'object', properties };
}
