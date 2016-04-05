import CheddarLexer from '../tok/lex';
import {TOKEN_START} from '../consts/chars';
import * as CheddarError from '../consts/err';

export default class CheddarLiteral extends CheddarLexer {
    exec() {

        this.open();

        let chr = this.getChar();

        if (TOKEN_START.indexOf(chr) > -1) {
            this.addToken(chr);

            while (chr = this.getChar())
                if (TOKEN_START.indexOf(chr) > -1) {
                    this.addToken(chr);
                } else {
                    --this.Index;
                    break;
                }

            return this.close();

        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}