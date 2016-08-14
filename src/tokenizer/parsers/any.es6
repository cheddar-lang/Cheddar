import CheddarLexer from '../literals/literal';

import CheddarBooleanToken from '../literals/boolean';
import CheddarNilToken from '../literals/nil';

import CheddarStringToken from '../literals/string';
import CheddarNumberToken from '../literals/number';
import CheddarArrayToken from './array';
import CheddarRegexToken from '../literals/regex';
import CheddarDictToken from '../literals/dict';
import CheddarSymbolToken from '../literals/symbol';

import CheddarFunctionizedOperatorToken from '../literals/fop';
import CheddarFunctionizedPropertyToken from '../literals/fprop';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);

        let attempt = this.attempt(
            CheddarFunctionizedPropertyToken,
            CheddarFunctionizedOperatorToken,
            CheddarDictToken,
            CheddarStringToken,
            CheddarNumberToken,
            CheddarBooleanToken,
            CheddarNilToken,
            CheddarArrayToken,
            CheddarRegexToken,
            CheddarSymbolToken
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
