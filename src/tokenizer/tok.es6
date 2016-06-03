// Global tokenizer
//  tokenizes expressions and all that great stuff

import CheddarLexer from './tok/lex';
import CheddarEXPLICIT from './patterns/EXPLICIT';

import * as CheddarError from './consts/err';

import S1_ASSIGN from './states/assign';
import S2_IF from './states/if';
import S2_FOR from './states/for';
import S3_EXPR from './states/expr';

var CLOSES = '\n;';

const VALID_END = chr =>
    (CLOSES.indexOf(chr) > -1) || !chr;

export default class CheddarTokenize extends CheddarLexer {
    exec(ENDS = "") {

        let MATCH = this.attempt(
            S1_ASSIGN,
            S2_IF,
            S2_FOR,
            S3_EXPR
        );

        this.Tokens = MATCH;
        this.Index = MATCH.Index;

        if (MATCH instanceof CheddarLexer) {

            while (this.Code[this.Index] && /[\r\t\f ]/.test(this.Code[this.Index]) || this._jumpComment()) {
                this.Index++;
            }

            if (ENDS.indexOf(this.Code[this.Index]) > -1) {
                return this.close();
            }

            if (!MATCH instanceof CheddarEXPLICIT && !VALID_END(this.Code[this.Index]))
                return CheddarError.UNEXPECTED_TOKEN;

            this.Index++;

            this.jumpWhite();

            if (this.Code[this.Index]) {
                let M2 = new CheddarTokenize(this.Code, this.Index);
                let response = M2.exec();

                if (response instanceof CheddarLexer) {
                    this._Tokens.push(...M2._Tokens);
                    this.Index = M2.Index;
                }
                else {
                    if (response !== CheddarError.EXIT_NOTFOUND)
                        return this.error(response);
                }

            }

            return this.close();
        }
        else {
            return this.error(MATCH);
        }
    }

}