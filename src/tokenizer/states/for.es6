import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import CheddarLexer from '../patterns/EXPLICIT';
import * as CheddarError from '../consts/err';

export default class StatementFor extends CheddarLexer {
    exec() {
        this.open();

        if (!this.lookAhead("for"))
            return CheddarError.EXIT_NOTFOUND;



        return this.close();
    }
}
