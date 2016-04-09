'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = require('../../../tokenizer/consts/types');

class CheddarBoolean extends Boolean {
    static create(Token) {
        if (!Token.tok) return new CheddarBoolean(Token);
        return new CheddarBoolean(Token.tok());
    }

    get Type() {
        return _types.ClassType.Boolean;
    }
}
exports.default = CheddarBoolean;
module.exports = exports['default'];