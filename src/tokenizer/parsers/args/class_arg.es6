import CheddarLexer from '../../tok/lex';
import CheddarVariableToken from '../../literals/var';
import CheddarTypedVariableToken from './typed_var';
import CheddarExpressionToken from '../expr';

export default class CheddarArgumentToken extends CheddarLexer {
    exec() {
        // [const|var] arg[: Type][?]
    }
}