'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = require('../../../tokenizer/consts/types');

class CheddarString extends String {
    static create(Token) {
        let ret;
        if (!Token.tok) ret = new CheddarString(Token);else ret = new CheddarString(Token.tok());
        if (require) ret.Type = _types.ClassType.String;
        //node patch
        return ret;
    }

    get Type() {
        return _types.ClassType.String;
    }
}
exports.default = CheddarString;
module.exports = exports['default'];