import CheddarLexer from '../tok/lex';
import StatementExpression from './expr';
import { TOKEN_END } from '../consts/chars';
import * as CheddarError from '../consts/err';

export default class StatementReturn extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        if (!this.jumpLiteral("return"))
            return CheddarError.EXIT_NOTFOUND;

        if (TOKEN_END.indexOf(this.Code[this.Index]) > -1)
            return CheddarError.EXIT_NOTFOUND;

        this.Tokens = "return";

        let parser = this.initParser(StatementExpression);
        let res = parser.exec();

        if (!(res instanceof CheddarLexer)) {
            this.Index = parser.Index;
            return res;
        }

        this.Index = res.Index;
        this.Tokens = res;

        return this.close();
    }
}