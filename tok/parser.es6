// Define parser
import CheddarLexer from './lex';
import CheddarTokens from './tks';
import {WHITESPACE} from '../chars';

export default class CheddarParser {

    constructor(Code, Index) {
        this.Code  = Code;
        this.Index = Index;
        
        this._Tokens = [];
    }

    // Parse from tokenized result
    parse(parseClass, ...args) {
        if (parseClass.prototype instanceof CheddarLexer) {
            let Parser = new parseClass(this.Code, this.Index).exec(...args);

            this._Tokens.push(Parser.Tokens);
            this.Index = Parser.Index;
            console.log(JUMP_WHITE);
            return this;
        } else {
            throw new TypeError(`CheddarParser: provided parser is not a CheddarLexer`)
        }
    }
    
    jumpwhite() {
        while(WHITESPACE.indexOf(this.Code[this.Index]) > -1) this.Index++;
    }

    get Tokens() { return this._Tokens instanceof CheddarTokens ? this._Tokens : new CheddarTokens(this._Tokens) }
    set Tokens(v) { if (v instanceof CheddarTokens || v instanceof Array) this._Tokens = v }

}