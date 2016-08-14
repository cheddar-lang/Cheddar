import StatementAssign from './assign';
import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import StatementBreak from './break';
import CheddarLexer from '../patterns/EXPLICIT';
import * as CheddarError from '../consts/err';

import CheddarVariableToken from '../literals/var';
import CheddarCustomLexer from '../parsers/custom';
import CheddarArrayToken from '../parsers/array';

let DECONSTRUCT = CheddarCustomLexer(CheddarArrayToken, '[', ']', CheddarVariableToken, true);

export default class StatementFor extends CheddarLexer {
    exec(tokenizer) {
        this.open();

        if (tokenizer) {
            tokenizer.args.PARSERS.push(StatementBreak);
        }

        let codeblock = CheddarCustomLexer(CheddarCodeblock, tokenizer);

        if (!this.lookAhead("for"))
            return CheddarError.EXIT_NOTFOUND;

        this.jumpLiteral("for");

        let FOR = this.grammar(true,
            [
                '(',
                    [StatementAssign, CheddarExpressionToken], ';',
                    CheddarExpressionToken, ';',
                    CheddarExpressionToken,
                ')', codeblock
            ],
            [
                '(',
                    [DECONSTRUCT, CheddarVariableToken], 'in', CheddarExpressionToken,
                ')', codeblock
            ]
        );

        return FOR;
    }
}
