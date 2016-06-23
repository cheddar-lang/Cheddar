import CheddarLexer from '../tok/lex';

import CheddarBooleanToken from '../literals/boolean';
import CheddarStringToken from '../literals/string';
import CheddarNumberToken from '../literals/number';
import CheddarArrayToken from './array';
// import CheddarBlockToken from './block';
import CheddarFunctionToken from './function';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);

        let attempt = this.attempt(CheddarStringToken, CheddarNumberToken, CheddarBooleanToken, CheddarArrayToken, CheddarFunctionToken);

        if (attempt instanceof CheddarLexer) {
            this.Index = attempt.Index;
            this.Tokens = attempt;
            return this.close();
        } else {
            return this.error(attempt);
        }
    }
}
