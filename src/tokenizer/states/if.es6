import CheddarExpressionToken from '../parsers/expr';
import CheddarCodeblock from '../patterns/block';
import CheddarLexer from '../patterns/EXPLICIT';

export default class StatementIf extends CheddarLexer {
    exec() {
        this.open();

        return this.grammar(true,
            ['if', CheddarExpressionToken, CheddarCodeblock]
        );
    }
}