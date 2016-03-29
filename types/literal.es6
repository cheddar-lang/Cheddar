import * as CheddarError from '../err/list';
import CheddarLexer from '../tok/lex';
import CheddarTokens from '../tok/tks';

import CheddarStringToken from '../literals/string';
import CheddarNumberToken from '../literals/number';
import CheddarLiteralToken from '../literals/literal';

export default class ChessarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);

        const start_index = this.Index;
        
        let attempt = this.parse(CheddarStringToken);
        if (attempt instanceof CheddarLexer)
            return this
        else if (attempt !== CheddarError.EXIT_NOTFOUND) // detects if it's not an explicit exit error
            return attempt;

        this.Index = start_index;
        attempt = this.Parse(CheddarNumberToken);
        if (attempt instanceof CheddarLexer)
            return this;
        else if (attempt !== CheddarError.EXIT_NOTFOUND)
            return attempt;

        this.close();
    }
}
