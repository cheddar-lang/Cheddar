import CheddarExpressionToken from './expr';
import CheddarExpressionsToken from './exprs';
import {LAMBDA_ASSIGNMENT, LAMBDA_NO_ARGS} from '../consts/lambda';
import CheddarLexer from '../tok/lex';
import CheddarArrayToken from './array';
import CheddarArgumentToken from './argument';
import CheddarCustomLexer from './custom';

export default class CheddarFunctionToken extends CheddarLexer {
    exec() {
        this.open(false);

        const E = CheddarExpressionToken;
        const S = CheddarExpressionToken;
        const L = LAMBDA_ASSIGNMENT;
        const N = LAMBDA_NO_ARGS;
        const A = CheddarCustomLexer(CheddarArrayToken, '(', ')', CheddarArgumentToken);

        return this.grammar(true,
            [L, A, '{', S, '}'],
            [L, A, E],
            //[N, '{', S, '}'],
            [N, E]
        );
    }
}