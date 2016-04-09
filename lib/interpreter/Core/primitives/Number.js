'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = require('../../../tokenizer/consts/types');

class CheddarNumber extends Number {
    static create(Token) {
        if (!Token.tok) return new CheddarNumber(Token);
        return new CheddarNumber((Token.tok(2).includes('.') ? parseFloat : parseInt)(Token.tok(2) + '0'.repeat(Token.tok(1)), Token.tok()));
    }

    get Type() {
        return _types.ClassType.Number;
    }
}
exports.default = CheddarNumber;
module.exports = exports['default'];