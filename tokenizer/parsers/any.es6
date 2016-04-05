import CheddarLexer from '../tok/lex';

import CheddarBooleanToken from '../literals/boolean';
import CheddarStringToken from '../literals/string';
import CheddarNumberToken from '../literals/number';
import CheddarArrayToken from './array';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);
        
        let attempt = this.attempt(CheddarStringToken, CheddarNumberToken, CheddarBooleanToken, CheddarArrayToken);
        
        if (attempt instanceof CheddarLexer)
            return this.close(attempt);
        else
            return this.error(attempt);
    }
}
