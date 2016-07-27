import CheddarLexer from '../tok/lex';
import CheddarPrimitive from './primitive';
import * as CheddarError from '../consts/err';
import CheddarVariableToken from './var';

const SYMBOL_OPEN = '@';
export default class CheddarSymbolToken extends CheddarPrimitive {
    exec() {
        this.open();

        if (this.getChar() === SYMBOL_OPEN) {
            let varparse = this.initParser(CheddarVariableToken);
            let res = varparse.exec();

            if (!( res instanceof CheddarLexer )) {
                return res;
            } else {
                this.addToken(varparse._Tokens[0]);
                this.Index = varparse.Index;
                return this.close();
            }
        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}