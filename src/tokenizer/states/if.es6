import CheddarLexer from '../tok/lex';
import CheddarExpressionToken from '../parsers/expr';

export default class StatementIf extends CheddarLexer {
    exec() {
        this.open();

        // TODO: ifs
        return this.grammar(true,
            ['if', this.jumpWhite, ]
        );
    }
}