import CheddarLexer from '../tok/lex';
import CheddarExpressionToken from '../parsers/expr';

export default class StatementExpression extends CheddarLexer {
    exec() {
        this.open(false);

        return this.grammar(true,
            [[CheddarExpressionToken]]
        )
    }
}