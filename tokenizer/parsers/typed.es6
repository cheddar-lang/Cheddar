import * as CheddarError from '../consts/err';
import CheddarAnyLiteral from './any';
import CheddarLiteral from '../literals/literal';
import CheddarLexer from '../tok/lex';

//TODO: make it do stuff when types are implemented
export default class CheddarTypedLiteral extends CheddarLexer {
    exec() {
        this.open(false);
        
        return this.grammar(true, true,
            [CheddarLiteral, ':', CheddarAnyLiteral],
            [CheddarAnyLiteral]
        );
    }
}