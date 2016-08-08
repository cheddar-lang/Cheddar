import CheddarLexer from '../tok/lex';
import CheddarCodeblock from '../patterns/block';
import CheddarArrayToken from '../parsers/array';
import CheddarArgumentToken from '../parsers/args/argument';
import CheddarVariableToken from '../literals/var';
import CheddarCustomLexer from '../parsers/custom';

import * as CheddarError from '../consts/err';

const A = CheddarCustomLexer(CheddarArrayToken, '(', ')', CheddarArgumentToken, true);

export default class StatementFunc extends CheddarLexer {
    exec(tokenizer) {
        this.open(false);
        this.jumpWhite();

        if (!this.lookAhead("func"))
            return CheddarError.EXIT_NOTFOUND;

        this.jumpLiteral("func");

        let codeblock = CheddarCustomLexer(CheddarCodeblock, tokenizer);

        let grammar = this.grammar(true, [
            CheddarVariableToken, A, codeblock
        ]);

        return grammar;
    }
}