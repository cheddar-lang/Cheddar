import NIL from './core/consts/nil';
import Signal from './signal';

export default class CheddarExec {
    constructor(exec_stack, scope, filter_item, data) {
        this.Code = exec_stack._Tokens;
        this._csi = 0;
        this.Scope = scope;

        this.data = data;
        this.links = require('./links')(filter_item);

        this.continue = true;
        this.lrep = new NIL;
    }

    step() {
        let item = this.Code[this._csi++];
        let sproc = this.links[item.constructor.name];

        let proc = new sproc(item, this.Scope, this.data);
        let resp = proc.exec();

        if (typeof resp === "string") {
            this.continue = false;
            this.lrep = resp;
        } else if (typeof resp === "undefined") {
            this.lrep = new NIL;
        } else if (resp instanceof Signal) {
            resp.res = this.lrep;
            this.lrep = resp;
            this.continue = false;
        } else {
            this.lrep = resp;
        }
    }

    exec(OPTS) {
        if (OPTS) global.CHEDDAR_OPTS = OPTS;

        if (this.Code[this._csi] && this.continue) {
            if (global.CHEDDAR_OPTS && global.CHEDDAR_OPTS.hook) {
                return global.CHEDDAR_OPTS.hook(this);
            } else {
                this.step();
                return this.exec();
            }
        } else {
            return this.lrep;
        }
    }
}
