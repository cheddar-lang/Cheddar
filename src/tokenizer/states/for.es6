import StatementAssign from './assign';
import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import CheddarLexer from '../patterns/EXPLICIT';
import * as CheddarError from '../consts/err';

import CheddarVariableToken from '../literals/var';
import CheddarCustomLexer from '../parsers/custom';
import CheddarArrayToken from '../parsers/array';

let DECONSTRUCT = CheddarCustomLexer(CheddarArrayToken, '[', ']', CheddarVariableToken, true);

export default class StatementFor extends CheddarLexer {
    exec() {
        this.open();

        if (!this.lookAhead("for"))
            return CheddarError.EXIT_NOTFOUND;

        this.jumpLiteral("for");

        let FOR = this.grammar(true,
            [
                '(',
                    [DECONSTRUCT, CheddarVariableToken],'in', CheddarExpressionToken,
                ')', CheddarCodeblock
            ],
            [
                '(',
                    [StatementAssign, CheddarExpressionToken], ';',
                    CheddarExpressionToken, ';',
                    CheddarExpressionToken,
                ')', CheddarCodeblock
            ]
        );

        if (FOR === CheddarError.EXIT_NOTFOUND) {
            return CheddarError.UNEXPECTED_TOKEN;
        } else {
            return FOR;
        }
    }
}
