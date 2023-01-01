import { Rule } from 'eslint';
import { TSESTree } from '@typescript-eslint/utils';

export const meta: Rule.RuleMetaData = {
  fixable: 'code',
  type: 'problem',
};

export const create = (context: Rule.RuleContext): Rule.NodeListener => {
  return {
    VariableDeclarator: (node) => {
      // id, "=" 왼쪽
      // init, "=" 오른쪽
      const { id, init } = node;

      // atom(~) 확인
      if (init.type !== 'CallExpression') return;
      if (init.callee.type !== 'Identifier') return;

      const recoilCalleeNames = ['atom', 'atomFamily', 'selector', 'selectorFamily'];
      if (!recoilCalleeNames.includes(init.callee.name)) return;

      // object argument 유무 확인
      const argument = init.arguments[0];
      if (!argument) return;
      if (argument.type !== 'ObjectExpression') return;

      const { properties } = argument;
      if (!properties) return;

      const { name } = id as TSESTree.Identifier;
      const propertyKey = properties.find((v) => {
        const property = v as TSESTree.Property;
        const key = property.key as TSESTree.Identifier;
        const isProperty = property.type === 'Property';
        const isKey = key.name === 'key';
        return isProperty && isKey;
      }) as TSESTree.Property;
      const currentKeyLiteral = propertyKey?.value as TSESTree.Literal;
      const currentKey = currentKeyLiteral?.value.toString();

      // random string (length=4, charset=hex)
      const randomValue = Math.random().toString(16).slice(2, 6);
      const key = `${name}_${randomValue}`;
    },
  };
};
