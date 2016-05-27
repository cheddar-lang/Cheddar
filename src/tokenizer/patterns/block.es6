import CheddarLexer from '../tok/lex';
import CheddarTokenize from '../tok';
import CheddarCustomParser from '../parsers/custom';

export default class CheddarCodeblock extends CheddarLexer {
    exec() {
        console.log('ATTEMPTING')
        return this.grammar(true,
            ['{', CheddarCustomParser(CheddarTokenize, '}')]
        );
    }
}