import CheddarTokens from './tks';

export default class CheddarLexer {
    constructor(Code, Index) {
        this.Code  = Code;
        this.Index = Index;

        this._Tokens = [];
    }

    getchar() {
        if (this.Code[this.Index]) return this.Code[this.Index++]
        else return false;
    }

    newtoken(fill = "") { this._Tokens[this._Tokens.push(fill) - 1] }
    addtoken(char = "") { this._Tokens[this._Tokens.length - 1] += char }

    open() {
        if (this.Code === null || this.Index === null)
            throw new TypeError("CheddarLexer: uninitialized code, index.");
        else
            this.newtoken();
    }
    close() { return this }
    error(id) { return id }

    get Tokens() { return new CheddarTokens(this._Tokens) }
    set Tokens(c) {
        if (v instanceof CheddarTokens) this._Tokens = v;
        else throw new TypeError("CheddarLexer: provided update `Tokens` is invalid");
    }
}