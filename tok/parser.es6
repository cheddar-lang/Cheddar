// Define parser
import CheddarLexer from './lex';
import CheddarTokens from './tks';

export default class CheddarParser {
    
    constructor(Code, Index) {
        this.Code  = Code;
        this.Index = Index;
        this._Tokens = [];
    }
    
    // Parse from tokenized result
    parse(parseClass, ...args) {
        if (parseClass instanceof CheddarLexer) {
            let Parser = new parseClass(this.Code, this.Index).exec(...args);
            
            this._Tokens.push(Parser.Tokens);
            this.Index = Parser.Index;
        } else {
            throw new TypeError(`CheddarParser: provided parser is not a CheddarLexer`)
        }
    }
    
    get Tokens() { return this._Tokens instanceof CheddarTokens ? this._Tokens : new CheddarTokens(this._Tokens) }
    set Tokens(v) { if (v instanceof CheddarTokens || v instanceof Array) this._Tokens = v }
    
}