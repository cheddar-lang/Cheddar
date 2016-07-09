// Global tokenizer
//  tokenizes expressions and all that great stuff

import CheddarLexer from './tok/lex';
import CheddarEXPLICIT from './patterns/EXPLICIT';

import * as CheddarError from './consts/err';
import CheddarErrorMessage from './consts/err_msg';
import HelperLoc from '../helpers/loc';

import S1_ASSIGN from './states/assign';
import S2_IF from './states/if';
import S2_FOR from './states/for';
import S3_EXPR from './states/expr';

var CLOSES = '\n;';

const VALID_END = chr =>
    (CLOSES.indexOf(chr) > -1) || !chr;

const FORMAT_ERROR = (TOK, LEXER) => TOK
    .replace(/\$LOC/, HelperLoc(LEXER.Code, LEXER.Index).slice(0, 2).join(":"))
    .replace(/\$1/, LEXER.Code[LEXER.Index]);

const SINGLELINE_WHITESPACE = /[\t\f ]/;
const NEWLINE = /[\r\n]/;

export default class CheddarTokenize extends CheddarLexer {
    exec(ENDS = "") {

        let MATCH = this.attempt(
            S1_ASSIGN,
            S2_IF,
            S2_FOR,
            S3_EXPR
        );

        if (MATCH instanceof CheddarLexer && MATCH.Errored !== true) {

            this.Tokens = MATCH;
            this.Index = MATCH.Index;

            // Whether or not it backtracked for a newline
            let backtracked = false;

            while (SINGLELINE_WHITESPACE.test(this.Code[this.Index])) {
                backtracked = true;
                this.Index--;
            } /* then { */
            if (backtracked) {
                if (NEWLINE.test(this.Code[this.Index - 1])) {
                    this.Index--;
                }
            }

            while (this.Code[this.Index] && SINGLELINE_WHITESPACE.test(this.Code[this.Index]) || this._jumpComment()) {
                this.Index++;
            }

            if (ENDS.indexOf(this.Code[this.Index]) > -1) {
                return this.close();
            }

            if (!(MATCH instanceof CheddarEXPLICIT) && !(VALID_END(this.Code[this.Index]))) {
                return this.error(
                    FORMAT_ERROR(
                        CheddarErrorMessage.get(
                            CheddarError.UNEXPECTED_TOKEN
                        )
                    , this)
                );
            }

            this.Index++;

            this.jumpWhite();

            if (this.Code[this.Index]) {
                let M2 = new CheddarTokenize(this.Code, this.Index);
                let response = M2.exec(...arguments);

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
            if (MATCH instanceof CheddarLexer) {
                return this.error(
                    FORMAT_ERROR(
                        CheddarErrorMessage.get(
                            CheddarError.UNEXPECTED_TOKEN
                        )
                    , this)
                );
            } else {
                return this.error(
                    FORMAT_ERROR(
                        typeof MATCH === 'symbol'
                        ? CheddarErrorMessage.get( MATCH )
                        : MATCH.toString()
                    , this)
                );
            }
        }
    }

}