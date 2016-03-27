import CheddarLexer from '../tok/lex';
import {TOKEN_START} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarLiteral {
    constructor(Code, Index) {
        // this.InternelRepresentation = InternelRepresentation;

        this.Code  = null;
        this.Index = null;

        this.Lexer = new CheddarLexer(null, null);
    }

    load(Code, Index) { this.Lexer = new CheddarLexer(Code, Index) }

    exec() {

        this.Lexer.open();

        let chr = this.Lexer.getchar();

        if (TOKEN_START.indexOf(chr) > -1) {
            this.Lexer.addtoken(chr);

            while (chr = this.Lexer.getchar())
                if (TOKEN_START.indexOf(chr) > -1)
                    this.Lexer.addtoken(chr);
                else break;

            return this.Lexer.close();

        } else {
            return this.Lexer.error(CheddarError.EXIT_NOTFOUND);
        }

    }
}