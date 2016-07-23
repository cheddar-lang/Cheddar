import Signal from '../signal';
export default class CheddarAssign {
    constructor(toks, scope) {
        this.toks = toks;
        this.scope = scope;
    }

    exec() {
        return new Signal(Signal.BREAK, { propagation: 1 });
    }
}