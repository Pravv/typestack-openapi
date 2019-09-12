import { Type } from 'ts-morph';
import { schemas } from '../ast';
import { toSchema } from './schemaParse';

export function parseType(type: Type, chainOfTypes) {
  if (type.isArray()) type = type.getArrayElementType();

  const typeName = type.getText() !== 'any' ? type.getText() : 'object';

  if (type.isEnum()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return { type: 'string', enum: [...type.compilerType.aliasSymbol.exports.keys()] };
  }
  if (type.isEnumLiteral()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return { type: 'string', enum: [...type.compilerType.symbol.parent.exports.keys()] };
  }

  if (!type.isClassOrInterface()) return { type: typeName };

  const className = type.getSymbol().getEscapedName();

  if (!chainOfTypes.includes(className) && !schemas[className]) {
    chainOfTypes.push(className);
    toSchema(type, chainOfTypes);
  }

  return { $ref: `#/components/schemas/${className}` };
}

export function topLevel(type: Type) {
  if (type.isArray()) type = type.getArrayElementType();

  const typeName = type.getText() !== 'any' ? type.getText() : 'object';

  if (type.isEnum()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return { type: 'string', enum: [...type.compilerType.aliasSymbol.exports.keys()] };
  }
  if (type.isEnumLiteral()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return { type: 'string', enum: [...type.compilerType.symbol.parent.exports.keys()] };
  }

  if (type.getSymbol() && ['__object'].includes(type.getSymbol().getEscapedName())) {
    return toSchema(type, [type.getSymbol().getEscapedName()]);
  }

  if (!type.isClassOrInterface()) return { type: typeName };

  const className = type.getSymbol().getEscapedName();
  const chainOfTypes = [className];

  if (!schemas[className]) {
    toSchema(type, chainOfTypes);
  }

  return { $ref: `#/components/schemas/${className}` };
}

export function unwrapType(type: Type) {
  if (!type.isClassOrInterface() && !type.getSymbol()) return type;

  if (['Promise'].includes(type.getSymbol().getEscapedName())) {
    return type.getTypeArguments()[0];
  }

  if (['__type'].includes(type.getSymbol().getEscapedName()) && type.getAliasSymbol()) {
    return type.getAliasTypeArguments()[0];
  }

  return type;
}
