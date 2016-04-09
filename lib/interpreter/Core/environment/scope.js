"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class CheddarExecutionScope {
    constructor() {

        // Initialize the hash
        this.Scope = new Map();
    }

    access(token) {
        return this.Scope.get(token);
    }
    manage(token, value) {
        return this.Scope.set(token, value);
    }
}
exports.default = CheddarExecutionScope;
module.exports = exports['default'];