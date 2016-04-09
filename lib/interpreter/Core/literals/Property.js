'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class CheddarProperty {
    constructor(Tokens, Arguments) {
        this.Tokens = Tokens;
        this.Arguments = Arguments;
    }

    create(Token) {
        let ret = new CheddarProperty();
        for (let i = 0, token; token = Token.tok(i); i++) {
            if (token.constructor.name === 'CheddarTokens') ret.Arguments.push([i, token._Tokens]);else ret.Tokens.push(token);
        }
        return ret;
    }
}
exports.default = CheddarProperty;
module.exports = exports['default'];