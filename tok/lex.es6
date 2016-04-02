import * as CheddarError from '../consts/err';
import CheddarTokens from './tks';

export default class CheddarLexer {
    constructor(Code, Index) {
        this.Code  = Code;
        this.Index = Index;
        
        this._Tokens = [];
    }

    getChar() {
        return this.Code[this.Index++];
    }
    
    get curchar() { return this.Code[this.Index] }

    newToken(fill = '') { this._Tokens[this._Tokens.push(fill) - 1]; return this }
    addToken(char = '') { this._Tokens[this._Tokens.length - 1] += char; return this }

    get last() { return this._Tokens[this._Tokens.length - 1] }
    
    open(forceNot) {
        if (this.Code === null || this.Index === null)
            throw new TypeError('CheddarLexer: uninitialized code, index.');
        else if (forceNot !== false)
            this.newToken();
    }

    close() { delete this.Code; return this }
    error(id) { return id }
    // Return error, perhaps later in a CheddarSyntaxError() class
    // Error not thrown because it is a error with the provided
    // not the actual interpreter

    get Tokens() { return new CheddarTokens(this._Tokens) }
    set Tokens(v) { this._Tokens.push(v) }
    
    get isLast() { return this.Index === this.Code.length }
    
    parse(parseClass, ...args) {
        if (parseClass.prototype instanceof CheddarLexer) {
            // Run provided parser
            let Parser = new parseClass(this.Code, this.Index);
            let ParserResult = Parser.exec(...args);
            
            // Add new tokens
            // this does NOT override old tokens
            // this is because `this.Tokens` has
            // a custom setter
            this.Tokens = Parser;
            this.Index = Parser.Index;
            
            return ParserResult;
        } else {
            throw new TypeError('CheddarLexer: provided parser is not a CheddarLexer');
        }
    
    }
    
    attempt(...parsers) {
        let attempt;
        
        for (let i = 0; i < parsers.length; i++) {
            attempt = this.initParser(parsers[i]).exec();
            if (attempt instanceof CheddarLexer)
                return attempt;
            else if (attempt !== CheddarError.EXIT_NOTFOUND)
                return this.error(attempt);
        }
        
        return this.error(CheddarError.EXIT_NOTFOUND);
    }
    
    initParser(parseClass) {
        if (parseClass.prototype instanceof CheddarLexer)
            return new parseClass(this.Code, this.Index);
        else
            throw new TypeError('CheddarLexer: provided parser is not a CheddarLexer');
    }
    
    jumpWhite() {
        const WHITESPACE_REGEX = /\s/;
        while(WHITESPACE_REGEX.test(this.Code[this.Index]))
            this.Index++;
        return this;
    }
    
    jumpLiteral(l) {
        if (this.Code.indexOf(l) === this.Index)
            this.Index += l.length;
        else
            return false;
        return this;
    }
}