'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _types = require('../../../tokenizer/consts/types');

var _simplify = require('../simplify');

var _simplify2 = _interopRequireDefault(_simplify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarArray extends Array {
    static create(Token) {
        if (!Token.tok) return new CheddarArray(Token);
        let ret = new CheddarArray(),
            token,
            tok;
        for (let i = 0; i < Token._Tokens.length; i++) if (tok = (token = Token.tok(i)).isExpression && token._Tokens.length === 1 ? token.tok() : token) ret.push((0, _simplify2.default)(tok) || tok);
        return ret;
    }

    get Type() {
        return _types.ClassType.Array;
    }
}
exports.default = CheddarArray;
module.exports = exports['default'];