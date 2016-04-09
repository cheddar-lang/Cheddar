"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// An abstract type class
class CheddarAbstract {
    constructor() {
        for (var _len = arguments.length, toks = Array(_len), _key = 0; _key < _len; _key++) {
            toks[_key] = arguments[_key];
        }

        this.Representation = toks;
    }
}
exports.default = CheddarAbstract;
module.exports = exports['default'];