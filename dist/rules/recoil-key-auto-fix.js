"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.meta = void 0;
exports.meta = {
    fixable: 'code',
    type: 'problem',
};
const create = (context) => {
    return {
        VariableDeclarator: (node) => {
            // id, "=" 왼쪽
            // init, "=" 오른쪽
            const { id, init } = node;
            // atom(~) 확인
            if (init.type !== 'CallExpression')
                return;
            if (init.callee.type !== 'Identifier')
                return;
            const recoilCalleeNames = ['atom', 'atomFamily', 'selector', 'selectorFamily'];
            if (!recoilCalleeNames.includes(init.callee.name))
                return;
            // object argument 유무 확인
            const argument = init.arguments[0];
            if (!argument)
                return;
            if (argument.type !== 'ObjectExpression')
                return;
            const { properties } = argument;
            if (!properties)
                return;
            const { name } = id;
            const propertyKey = properties.find((v) => {
                const property = v;
                const key = property.key;
                const isProperty = property.type === 'Property';
                const isKey = key.name === 'key';
                return isProperty && isKey;
            });
            const currentKeyLiteral = propertyKey === null || propertyKey === void 0 ? void 0 : propertyKey.value;
            const currentKey = currentKeyLiteral === null || currentKeyLiteral === void 0 ? void 0 : currentKeyLiteral.value.toString();
            // random string (length=4, charset=hex)
            const randomValue = Math.random().toString(16).slice(2, 6);
            const key = `${name}_${randomValue}`;
        },
    };
};
exports.create = create;
