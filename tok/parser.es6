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
            
            this.Tokens = Parser;
            this.Index = Parser.Index;
            
            return this;
        } else {
            throw new TypeError(`CheddarParser: provided parser is not a CheddarLexer`)
        }
    }
    
    jumpwhite() {
        let WHITESPACE_REGEX = /\s/;
        while(WHITESPACE_REGEX.test(this.Code[this.Index])) this.Index++;
        return this;
    }
    
    jumpliteral(l) {
        if (this.Code.indexOf(l) === this.Index) this.Index += l.length;
        else return false;
        return this;
    }

    get Tokens() { return new CheddarTokens(this._Tokens) }
    set Tokens(v) { this._Tokens.push(v) }

}