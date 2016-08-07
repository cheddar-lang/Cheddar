// Very similar to literal.es6 but with numbers
import * as CheddarError from '../consts/err';
import {TOKEN_START, TOKEN_END} from '../consts/chars';
import {RESERVED_KEYWORDS} from '../consts/ops';
import CheddarLexer from '../tok/lex';

export default class CheddarVariableToken extends CheddarLexer {
    exec() {

        this.open();

        let chr = this.getChar();

        if (TOKEN_START.indexOf(chr) > -1) {
            this.addToken(chr);

            while (chr = this.getChar())
                if (TOKEN_END.indexOf(chr) > -1) {
                    this.addToken(chr);
                } else {
                    --this.Index;
                    break;
                }

            // if a reserved keyword was matched
            if (RESERVED_KEYWORDS.has(this._Tokens[0])) {
                // Ignore it
                return this.error(CheddarError.EXIT_NOTFOUND);
            }

            return this.close();

        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}