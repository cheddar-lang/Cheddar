import CheddarLexer from '../tok/lex';
import CheddarVariableToken from '../literals/var';

import { OP, UOP } from '../consts/ops';

export default class StatementOp extends CheddarLexer {
    exec() {
        this.open(false);

        let res = this.grammar(true,
            [
                ['binary', 'unary'], this.jumpWhite, 'op', this.jumpWhite, CheddarVariableToken
            ]
        );

        if (res instanceof CheddarLexer) {
            let modifier = res._Tokens[0];
            let operator = res._Tokens[1]._Tokens[0];

            if (modifier === 'unary') {
                UOP.push(operator);
            } else if (modifier === 'binary') {
                OP.push(operator);
            }

        }

        this._Tokens = [ res._Tokens[0], res._Tokens[1]._Tokens[0] ];

        return res;
    }

