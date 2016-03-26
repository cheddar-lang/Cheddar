export default class VSLTokens {
    constructor(tokens) {
        if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else if (tokens === null) {
            this.length = -1;
        } else {
            throw new TypeError("VSLTokens: provided instantiation token is invalid");
        }
    }

    UpdateTokends(tokens) {
        if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else if (tokens === null) {
            this.length = -1;
        } else {
            throw new TypeError("VSLTokens: provided update token is invalid");
        }
    }

    * [Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
        return this;
    }
}