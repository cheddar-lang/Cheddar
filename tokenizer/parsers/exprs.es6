import CheddarLexer from '../tok/lex';
import CheddarExpressionToken from './expr';

export default class CheddarExpressionsToken extends CheddarLexer {
    exec() {
        this.open(false);

        let E = CheddarExpressionToken,
            S = CheddarExpressionsToken;

        let grammar = this.grammar(true,
            [E, ';', S],
            [E]
        );

        console.log('grammar', grammar);

        while (grammar) {
            if (grammar.tok())
                this.Tokens = grammar.tok();
            grammar = grammar.tok(1);
        }

        return this.close();
    }
}