import * as CheddarError from '../consts/err';
import CheddarExpressionToken from './expr';
import CheddarLexer from '../tok/lex';

//TODO
export default class CheddarParenthesizedExpression extends CheddarLexer {
    exec() {
        this.open(false);

        /*
        This may be shorter:
        return this.grammar(true, ['(', CheddarExpressionToken , ')']);
        */
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

        this.close();
        // TODO: shouldn't these be returns? (also, is this even needed anymore?)
    }
}