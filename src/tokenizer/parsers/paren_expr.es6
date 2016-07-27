import CheddarExpressionToken from './expr';
import CheddarCustomLexer from './custom';
import CheddarLexer from '../tok/lex';

let expr = CheddarCustomLexer(CheddarExpressionToken, true);
export default class CheddarParenthesizedExpression extends CheddarLexer {
    exec() {
        this.open(false);

        let resp = this.grammar(true,
            ['(', expr , ')']
        );

        if (resp instanceof CheddarLexer) {
            resp._Tokens[0].Index = resp.Index;
            return this.close();
        } else {
            return this.error(resp);
        }

        /*
        // @Downgoat you change it if it works
        if (this.getChar() !== '(')
            this.error(CheddarError.EXIT_NOTFOUND);

        this.jumpWhite();

        let attempt = this.initParser(CheddarExpressionToken).exec();
        if (!(attempt instanceof CheddarLexer))
            this.error(CheddarError.UNEXPECTED_TOKEN);

        this.Tokens = attempt.Tokens;
        this.Index = attempt.Index;

        this.jumpWhite();

        if (this.getChar() !== ')')
            this.error(CheddarError.UNMATCHED_DELIMITER);

        return this.close(attempt);*/
    }
}