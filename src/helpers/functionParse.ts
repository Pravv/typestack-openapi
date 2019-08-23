import { MethodDeclaration, ParameterDeclaration } from 'ts-morph';
import { topLevel, unwrapType } from './typeParse';


export function parseParam(x: ParameterDeclaration) {
  const type = unwrapType(x.getType());
  const typeText = topLevel(type);

  const decorators = x.getDecorators().map(x => x.getText());

  if (type.isArray()) {
    return { name: x.getName(), type: { items: typeText, type: 'array' } };
  }
  return { name: x.getName(), type: typeText, decorators };
}

export function parseReturn(x: MethodDeclaration) {
  const typeReturn = unwrapType(x.getReturnType());
 // typeReturn.compilerType
  if (topLevel(typeReturn).type === '{}') {
    console.log(topLevel(typeReturn));
  }

  if (typeReturn.isArray()) {
    return { type: { items: topLevel(typeReturn), type: 'array' } };
  }

  return { type: topLevel(typeReturn) };

}
