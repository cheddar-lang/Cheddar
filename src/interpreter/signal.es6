import NIL from './core/consts/nil';
export default class Signal {
    constructor(name, data = new NIL) {
        this.name = name;
        this.data = data;
    }

    is(sym) {
        return this.name === sym;
    }

    // SIGNALS
    static BREAK = Symbol('SIGBREAK');
    static RETURN = Symbol('RETURN');
}