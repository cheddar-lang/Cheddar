import CheddarLexer from '../tok/lex';
import { TOKEN_END } from '../consts/chars';
import * as CheddarError from '../consts/err';
export default class StatementBreak extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        if (!this.jumpLiteral("break"))
            return CheddarError.EXIT_NOTFOUND;

        if (TOKEN_END.indexOf(this.Code[this.Index]) > -1)
            return CheddarError.EXIT_NOTFOUND;

        this.Tokens = "break";

        return this.close();
    }
}