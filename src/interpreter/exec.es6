import links from './links';
import NIL from './core/consts/nil';

export default class CheddarExec {
    constructor(exec_stack, scope) {
        this.Code = exec_stack._Tokens;
        this.Scope = scope;

        this.errored = false;
        this.lrep = new NIL;
    }

    step() {
        let item = this.Code.shift();
        let sproc = links[item.constructor.name];

        let proc = new sproc(item, this.Scope);
        let resp = proc.exec();

        if (typeof resp === "string") {
            this.errored = true;
            this.lrep = resp;
        } else if (typeof resp === "undefined") {
            this.lrep = new NIL;
        } else {
            this.lrep = resp;
        }
    }

    exec() {
        while (this.Code.length && !this.errored)
            this.step();
        return this.lrep;
    }
}