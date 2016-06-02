import CheddarExec from '../exec';

export default class CheddarIf {
    constructor(toks, scope) {
        this.toks = toks;
        this.scope = scope;
    }

    exec() {
        console.log(this.toks._Tokens);
    }
}