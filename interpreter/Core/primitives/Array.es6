import {ClassType} from '../../../tokenizer/consts/types';

import simplify from '../simplify';

export default class CheddarArray extends Array {
    static create(Token) {
        if (!Token.tok)
            return new CheddarArray(Token);
        let ret = new CheddarArray(),
            token,
            tok;
        for (let i = 0; i < Token._Tokens.length; i++)
            if (tok = ((token = Token.tok(i)).isExpression && token._Tokens.length === 1) ?
                token.tok() :
                token
            )
                ret.push(simplify(tok) || tok);
        return ret;
    }

    get Type() { return ClassType.Array; }
}