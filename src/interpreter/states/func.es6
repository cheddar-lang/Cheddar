import CheddarFunction from '../core/env/func';
import CheddarVariable from '../core/env/var';

export default class CheddarFunc {
    constructor(toks, scope) {
        this.toks = toks._Tokens;
        this.scope = scope;
    }

    exec() {
        let res = new CheddarFunction(this.scope);

        res.init(
            this.toks[1],
            this.toks[2]
        );

        let out = this.scope.enforceset(
            this.toks[0]._Tokens[0],
            new CheddarVariable(res, {
                Writeable: false
            }),
            true
        );

        if (typeof out === 'string') {
            return out;
        }
    }
}