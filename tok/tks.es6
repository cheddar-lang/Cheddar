export default class CheddarTokens {
    constructor(tokens) {
        if (tokens === null) {
            this.length = -1;
        } else if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else {
            console.log("-----A-----");
            console.log(tokens);
            console.log("-----B-----");
            throw new TypeError("VSLTokens: provided instantiation token is invalid");
        }
    }

    UpdateTokends(tokens) {
        if (tokens === null) {
            this.length = -1;
        } else if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else {
            throw new TypeError("VSLTokens: provided update token is invalid");
        }
    }
    
    // Does nothing ATM
    splice() { }

    //* [Symbol.iterator]() {
    //    for (let i = 0; i < this.length; i++) {
    //        yield this[i];
    //    }
    //    return this;
    //}
}