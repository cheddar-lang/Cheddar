import CheddarLexer from '../tok/lex';
import CheddarVariableToken from '../literals/var';
import CheddarTypedVariableToken from './typed_var';
import CheddarExpressionToken from './expr';

export default class CheddarArgumentToken extends CheddarLexer {
    exec() { //why not just argument - array handles the rest - var
    // ah, okay
        this.open(false);

        const V = CheddarVariableToken;
        const E = CheddarExpressionToken;
        const T = CheddarTypedVariableToken;

        // this can become:
        /*
        [V, [['=', E]]]
        */
        return this.grammar(true,
            [T, ['?'], [['=', E]]]
        );
    }
}