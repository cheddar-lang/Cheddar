import CheddarLiteral from '../../literals/literal';
import CheddarVariableToken from '../../literals/var';
import CheddarLexer from '../../tok/lex';

var L = CheddarLiteral;
var V = CheddarVariableToken;

export default class CheddarTypedVariableToken extends CheddarLexer {
    exec() {
        this.open(false);

        return this.grammar(true,
            [V, [[':', L]]]
        );
    }
}