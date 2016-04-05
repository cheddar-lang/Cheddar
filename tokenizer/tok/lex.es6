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

    close(arg) {
        delete this.Code;
        return arg || this;
    }
    error(id) { return id }
    // Return error, perhaps later in a CheddarSyntaxError() class
    // Error not thrown because it is a error with the provided
    // not the actual interpreter

    get Tokens() { return new CheddarTokens(this._Tokens) }
    set Tokens(v) {
        if (Array.isArray(v))
            this._Tokens.push(...v);
        else
            this._Tokens.push(v);
    }
    
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
            throw new TypeError('CheddarLexer: provided parser is not a CheddarLexer ');
    }
    
    grammar(whitespace, ...defs) {
        // defs<Array<CheddarLexer or String>>
        let index,
            parser,
            result,
            tokens;
        
        main: for (let i = 0; i < defs.length; i++) {
            index = this.Index;
            tokens = [];
            for (let j = 0; j < defs[i].length; j++) {
                
                if (defs[i][j].prototype instanceof CheddarLexer) {
                    parser = new (defs[i][j])(this.Code, index);
                    result = parser.exec();

                    if (result === CheddarError.EXIT_NOTFOUND)
                        continue main;
                    else if (!(result instanceof CheddarLexer))
                        return this.error(result);
                        
                    index = parser.Index;
                    
                    // Filters out meaningless data
                    if (!(result.constructor.name === 'CheddarExpressionTokenAlpha' &&
                        result._Tokens.length === 0))
                        tokens.push(result);
                } else if (defs[i][j] === this.jumpWhite) {
                    let oldIndex = this.Index;
                    this.Index = index;
                    this.jumpWhite();
                    index = this.Index;
                    this.Index = oldIndex;
                } else {
                    let oldIndex = this.Index;
                    this.Index = index;
                    result = this.jumpLiteral(defs[i][j]);
                    if (result)
                        index = this.Index;
                    this.Index = oldIndex;
                    if (!result)
                        continue main;
                }
                
                if (whitespace) {
                    let oldIndex = this.Index;
                    this.Index = index;
                    this.jumpWhite();
                    index = this.Index;
                    this.Index = oldIndex;
                }
            }
            
            this.Tokens = tokens;
            this.Index = index;
            
            // This may intefere with <expr>
            //if (!CheddarPrimitive) {
            //    CheddarPrimitive = typeof System !== 'undefined' ? System.import('../literals/primitive') :
            //        require ? require('../literals/primitive') : 0;
            //}
            ////TODO: only will work then empty rule is tidied up
            //if (this._Tokens.length === 1 && this._Tokens[0] instanceof CheddarPrimitive)
            //    return this.close(this._Tokens[0]);
            //else
            return this.close();
        }
        
        return this.error(CheddarError.EXIT_NOTFOUND);
    }
    
    jumpWhite() {
        // TODO: Add support for comments
        const WHITESPACE_REGEX = /\s/;
        while(WHITESPACE_REGEX.test(this.Code[this.Index]))
            this.Index++;
        return this;
    }
    
    jumpLiteral(l) {
        //TODO: make more efficient
        if (this.Code.indexOf(l) === this.Index)
            this.Index += l.length;
        else
            return false;
        return this;
    }
}