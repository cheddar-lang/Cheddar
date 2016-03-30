import * as CheddarError from '../consts/err';
import CheddarLexer from '../tok/lex';
import CheddarTokens from '../tok/tks';

import CheddarStringToken from '../literals/string';
import CheddarNumberToken from '../literals/number';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);

        const types = [CheddarStringToken, CheddarNumberToken];
        let attempt;
        
        for (let i = 0; i < types.length; i++) {
            attempt = new types[i](this.Code, this.Index).exec();
            if (attempt !== CheddarError.EXIT_NOTFOUND)
                return attempt;
        }
        
        return CheddarError.EXIT_NOTFOUND;
    }
}
