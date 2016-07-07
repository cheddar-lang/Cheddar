import CheddarLexer from '../tok/lex';

import CheddarBooleanToken from '../literals/boolean';
import CheddarNilToken from '../literals/nil';

import CheddarStringToken from '../literals/string';
import CheddarNumberToken from '../literals/number';
import CheddarArrayToken from './array';
import CheddarFunctionToken from './function';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);

        let attempt = this.attempt(
            CheddarStringToken,
            CheddarNumberToken,
            CheddarBooleanToken,
            CheddarNilToken,
            CheddarArrayToken,
            CheddarFunctionToken
        );

        if (attempt instanceof CheddarLexer) {
            this.Index = attempt.Index;
            this.Tokens = attempt;
            return this.close();
        } else {
            return this.error(attempt);
        }
    }
}
