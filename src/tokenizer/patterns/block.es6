import CheddarLexer from '../tok/lex';
import CheddarTokenize from '../tok';

export default class CheddarCodeblock extends CheddarLexer {
    exec() {
        return this.grammar(true,
            ['{', CheddarTokenize, '}']
        );
    }
}