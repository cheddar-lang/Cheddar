import CheddarEval from '../core/eval/eval';
import Signal from '../signal';
export default class CheddarBreak {
    constructor(toks, scope) {
        this.toks = toks._Tokens;
        this.scope = scope;
    }

    exec() {
        let res = new CheddarEval(this.toks[1], this.scope).exec();

        if (typeof res === 'string') {
            return res;
        }

        return new Signal(Signal.RETURN, res);
    }
}
