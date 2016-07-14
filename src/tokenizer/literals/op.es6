import * as CheddarError from '../consts/err';
import CheddarLexer from '../tok/lex';
import {UOP, OP} from '../consts/ops';

export default class CheddarOperatorToken extends CheddarLexer {
    exec(UNARY) {
        let ops = UNARY ? UOP : OP;
        // this.Code is the code
        // this.Index is the index
        this.open(false);

        let op;
        for (let i = 0; i < ops.length; i++) {
            if (this.Code.indexOf(ops[i], this.Index) === this.Index) {
                if ((!op ||
                    op.length < ops[i].length) &&
                    !(/[a-z][a-z0-9]*/i.test(ops[i]) &&
                        /[a-z0-9]/i.test(this.Code[this.Index + ops[i].length]))
                )
                    op = ops[i];
            }
        }

        if (op) {
            this.Tokens = op;
            this.Index += op.length;
            return this.close();
        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}