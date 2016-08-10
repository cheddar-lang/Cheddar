import CheddarPrimitive from './primitive';

import CheddarLexer from '../tok/lex';
import CheddarArray from '../parsers/array';
import CheddarExpressionToken from '../parsers/expr';

import * as CheddarError from '../consts/err';

class CheddarDictItemToken extends CheddarLexer {
    exec() {
        this.open(false);

        // Match the key
        let key = this.initParser(CheddarExpressionToken);
        let key_tokens = key.exec(true);

        if (!(key_tokens instanceof CheddarLexer)) {
            this.Index = key.Index;
            return key_tokens;
        }

        this.Index = key_tokens.Index;
        this.Tokens = key_tokens;

        // Check if `:`, not then not dict
        if (!this.jumpLiteral(":")) {
            return CheddarError.EXIT_NOTFOUND;
        }

        this.jumpWhite();

        // Match the value
        let value = this.initParser(CheddarExpressionToken);
        let value_tokens = value.exec(true);

        if (!(value_tokens instanceof CheddarLexer)) {
            this.Index = value.Index;
            return value_tokens;
        }

        this.Index = value_tokens.Index;
        this.Tokens = value_tokens;

        return this.close();
    }
}

export default class CheddarDictToken extends CheddarPrimitive {
    exec() {
        this.open(false);
        let res_init = new CheddarArray(this.Code, this.Index);
        let res = res_init.exec('[', ']', CheddarDictItemToken);

        if (!(res instanceof CheddarLexer)) {
            this.Index = res_init.Index;
            return res;
        }

        this.Index = res.Index;
        this.Tokens = res;

        return this.close();
    }
}