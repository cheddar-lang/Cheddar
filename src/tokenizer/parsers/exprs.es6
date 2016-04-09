import CheddarLexer from '../tok/lex';
import CheddarExpressionToken from './expr';

export default class CheddarExpressionsToken extends CheddarLexer {
    exec() {
        this.open(false);

        let E = CheddarExpressionToken,
            S = CheddarExpressionsToken;

        return this.grammar(true,
            [E, ';', S],
            [E]
        );
    }

    get isExpression() { return true; }
}