import LiteralNumber from '../literals/number';
import LiteralString from '../literals/string';
import LiteralToken  from '../literals/literal';

import CheddarLexer  from '../tok/lex';

class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        // Run each literal and check if a CheddarError came back
        // If it's EXIT_NOTFOUND, then try the next literal
    }
}