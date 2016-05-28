import links from './links';
import NIL from './core/consts/nil';

export default class CheddarExec {
    constructor(exec_stack, scope) {
        this.Code = exec_stack._Tokens;
        this.Scope = scope;

        this.lrep = new NIL().init();
    }

    step() {
        let item = this.Code.shift();
        let sproc = links[item.constructor.name];

        let proc = new sproc(item, this.Scope);
        let resp = proc.exec();

        if (resp)
            this.lrep = resp;
    }

    exec() {
        while (this.Code.length)
            this.step();
        return this.lrep;
    }
}