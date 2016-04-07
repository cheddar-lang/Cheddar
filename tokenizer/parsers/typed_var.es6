import CheddarLiteral from '../literals/literal';
import CheddarVariableToken from '../literals/var';
import CheddarLexer from '../tok/lex';

var L = CheddarLiteral;
var V = CheddarVariableToken;

export default class CheddarTypedVariableToken extends CheddarLexer {
    exec() {
        this.open(false);

        // TODO: capture type name (L)
        return this.grammar(true,
            [[[L, ':']], V]
        );
    }
}