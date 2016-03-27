// Tokenizer Class
import CheddarTokens from './tks';
export default class CheddarTok {
    
    constructor(Code = "", Index = 0) {
        
        this.Code = Code; // Tokenize given code
        this.Index = Index; // Tokenize given code at given index
        this._Tokens = new CheddarTokens(null); // Result for Tokenized
        
    }
    
    get Tokens() { return this._Tokens }
    set Tokens(v) {
        if (v instanceof CheddarTokens) this._Tokens = v;
        else throw new TypeError("CheddarTok: provided update `Tokens` is invalid");
    }
    
}