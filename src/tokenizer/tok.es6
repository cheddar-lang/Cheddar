// Global tokenizer
//  tokenizes expressions and all that great stuff

import CheddarLexer from './tok/lex';

import * as CheddarError from './consts/err';

import S1_ASSIGN from './states/assign';
import S2_EXPR from './states/expr';

export default class CheddarTokenize extends CheddarLexer {
    exec() {

        let MATCH = this.attempt(
            S1_ASSIGN,
            S2_EXPR
        );

        this.Tokens = MATCH;
        this.Index = MATCH.Index;

        if (MATCH instanceof CheddarLexer) {

            while (this.Code[this.Index] && /[\r\t\f ]/.test(this.Code[this.Index]) || this._jumpComment()) {
                this.Index++;
            }

            if (this.Code[this.Index] !== "\n" && this.Code[this.Index] !== ";" && this.Code[this.Index]) {
                return CheddarError.UNEXPECTED_TOKEN;
            } else {
                return this.close();
            }
        } else {
            this.error(MATCH);
        }
    }
}