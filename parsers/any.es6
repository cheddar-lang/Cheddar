import * as CheddarError from '../consts/err';
import CheddarLexer from '../tok/lex';
import CheddarTokens from '../tok/tks';

import CheddarStringToken from '../literals/string';
import CheddarNumberToken from '../literals/number';
import CheddarArrayToken from './array';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);
        
        let attempt = this.attempt(CheddarStringToken, CheddarNumberToken, CheddarArrayToken);
        
        if (attempt instanceof CheddarLexer) {
            this.Tokens = attempt;
            this.Index = attempt.Index;
            return this.close()
        } else {
            return this.error(attempt);
        }
    }
}
