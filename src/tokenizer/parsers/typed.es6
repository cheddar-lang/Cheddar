import * as CheddarError from '../consts/err';
import CheddarAnyLiteral from './any';
import CheddarLiteral from '../literals/literal';
import CheddarLexer from '../tok/lex';
import CheddarArrayToken from './array';

import CheddarCustomLexer from './custom';

//TODO: make it do stuff when types are implemented
export default class CheddarTypedLiteral extends CheddarLexer {
    exec(LITERAL = [CheddarCustomLexer(CheddarArrayToken, '(', ')'), CheddarAnyLiteral]) {
        this.open(false);

        return this.grammar(true,
            [CheddarLiteral, ':', LITERAL],
            [CheddarAnyLiteral]
        );
    }
    static makeparser(arg) {
        let passed = new CheddarLexer();
        passed.exec = function() {
            return new CheddarTypedLiteral(this.Code, this.Index).exec(arg);
        };
        return passed;
    }
}