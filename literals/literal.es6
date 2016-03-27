import CheddarLexer from '../tok/lex';
import {TOKEN_START} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarLiteral extends CheddarLexer {
    constructor(Code, Index) {
        super(Code, Index);
    }
    
    exec() {

        this.open();

        let chr = this.getchar();

        if (TOKEN_START.indexOf(chr) > -1) {
            this.addtoken(chr);

            while (chr = this.getchar())
                if (TOKEN_START.indexOf(chr) > -1)
                    this.addtoken(chr);
                else break;

            return this.close();

        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }

    }
}