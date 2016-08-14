import CheddarLexer from '../../tok/lex';
import CheddarVariableToken from '../../literals/var';
import CheddarTypedVariableToken from './typed_var';
import CheddarExpressionToken from '../../states/expr';

export default class CheddarArgumentToken extends CheddarLexer {
    exec() {
        this.open(false);

        return this.grammar(true,
            [CheddarTypedVariableToken, ['?'], [['=', CheddarExpressionToken]]]
        );
    }
}