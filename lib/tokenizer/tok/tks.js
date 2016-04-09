"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class CheddarTokens {
    constructor(tokens) {
        if (tokens === null) {
            this.length = -1;
        } else if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else {
            throw new TypeError("CheddarTokens: provided instantiation token is invalid");
        }
    }

    UpdateTokens(tokens) {
        if (tokens === null) {
            this.length = -1;
        } else if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else {
            throw new TypeError("CheddarTokens: provided update token is invalid");
        }
    }

    push(token) {
        this[this.length] = token;
        this.length++;
    }

    // Does nothing ATM
    splice() {
        var _Array$prototype$spli;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return (_Array$prototype$spli = Array.prototype.splice).call.apply(_Array$prototype$spli, [this].concat(args));
    }

    //* [Symbol.iterator]() {
    //    for (let i = 0; i < this.length; i++) {
    //        yield this[i];
    //    }
    //    return this;
    //}
}
exports.default = CheddarTokens;
module.exports = exports['default'];