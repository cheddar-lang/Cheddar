import NIL from './core/consts/nil';
export default class Signal {
    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.res = new NIL;
    }

    is(sym) {
        return this.name === sym;
    }

    // SIGNALS
    static BREAK = Symbol('SIGBREAK');
}