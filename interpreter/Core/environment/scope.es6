import * as CheddarError from '../consts/err';

export default class CheddarExecutionScope {
    constructor(inherit) {

        // Initialize the hash
        this.Scope = new Map();
        this.Parent = inherit;

        this.sub = [];
    }

    add_scope() {
        // I am going to design this on paper fisrt
        // and then code it.
        let NewScope = new CheddarExecutionScope();
    }

    access(token) { return this.Scope.get(token) }
    manage(token, value) { return this.Scope.set(token, value) }
}