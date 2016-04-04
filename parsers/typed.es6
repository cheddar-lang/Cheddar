import * as CheddarError from '../consts/err';
import CheddarAnyLiteral from './any';
import CheddarLiteral from '../literals/literal';
import CheddarLexer from '../tok/lex';

export default class CheddarTypedLiteral extends CheddarLexer {
    exec() {
        this.open(false);
        
        return this.grammar(true,
            [CheddarLiteral, ':', CheddarAnyLiteral],
            [CheddarAnyLiteral]
        );
    }
}