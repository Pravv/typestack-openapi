import { MethodDeclaration, ParameterDeclaration } from 'ts-morph';
import { SwaggerType, parseType, unwrapType } from './typeParse';

export function parseParam(param: ParameterDeclaration): { name: string; type: { items?: SwaggerType; $ref?: string; type: 'array' } | SwaggerType; decorators?: string[] } {
  const type = unwrapType(param.getType());
  const swaggerType = parseType(type);

  const decorators = param.getDecorators().map(x => x.getText());

  if (type.isArray()) {
    return { name: param.getName(), type: { items: swaggerType, type: 'array' } };
  }
  return { name: param.getName(), type: swaggerType, decorators };
}

export function parseReturn(x: MethodDeclaration) {
  const typeReturn = unwrapType(x.getReturnType());

  if (typeReturn.isArray()) {
    return { type: { items: parseType(typeReturn), type: 'array' } };
  }

  return { type: parseType(typeReturn) };
}
