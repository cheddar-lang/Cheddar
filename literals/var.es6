// Very similar to literal.es6 but with numbers
import * as CheddarError from '../consts/err';
import {TOKEN_START, TOKEN_END} from '../consts/chars';
import CheddarLiteral from './literal';

export default class CheddarVariableToken extends CheddarLiteral {
    exec() {

        this.open();

        let chr = this.getChar();

        if (TOKEN_START.indexOf(chr) > -1) {
            this.addToken(chr);

            while (chr = this.getchar())
                if (TOKEN_END.indexOf(chr) > -1)
                    this.addToken(chr);
                else break;

            return this.close();

        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}