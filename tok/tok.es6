// Tokenizer Class
import 'VSLTokens';
export default class VSLTok {
    
    constructor(Code = "", Index = 0) {
        
        this.Code = Code; // Tokenize given code
        this.Index = Index; // Tokenize given code at given index
        this.Tokens = new VSLTokens(null); // Result for Tokenized
        
    }
    
    set Tokens(v) {
        if (v instanceof VSLTokens)
            this.Tokens = v;
        else
            throw new TypeError("VSLTok: provided update `Tokens` is invalid");
    }
    
}