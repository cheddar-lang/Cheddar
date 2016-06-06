import StatementAssign from './assign';
import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import CheddarLexer from '../patterns/EXPLICIT';
import * as CheddarError from '../consts/err';

export default class StatementFor extends CheddarLexer {
    exec() {
        this.open();

        if (!this.lookAhead("for"))
            return CheddarError.EXIT_NOTFOUND;

        let FOR = this.grammar(true, [
            'for', '(',
                [StatementAssign, CheddarExpressionToken], ';',
                CheddarExpressionToken, ';',
                CheddarExpressionToken,
            ')', CheddarCodeblock
        ]);

        if (FOR === CheddarError.EXIT_NOTFOUND) {
            return CheddarError.UNEXPECTED_TOKEN;
        } else {
            return FOR;
        }
    }
}
