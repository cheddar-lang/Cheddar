"use strict";

class ExecutionScope {
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