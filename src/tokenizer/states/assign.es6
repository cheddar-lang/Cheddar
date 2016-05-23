import CheddarLexer from '../tok/lex';

import CheddarExpressionToken from '../parsers/expr';
import CheddarVariableToken from '../literals/var';
import CheddarTypedVariableToken from '../parsers/typed_var';

export default class StatementAssign extends CheddarLexer {
    exec() {
        this.open(false);

        let DEFS = ['var', 'const'];
        return this.grammar(true,
            [DEFS, this.jumpWhite, CheddarVariableToken, ':=', CheddarExpressionToken],
            [DEFS, this.jumpWhite, CheddarTypedVariableToken, '=', CheddarExpressionToken]
        );
    }
}