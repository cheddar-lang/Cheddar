import * as CheddarError from '../consts/err';
import {ARRAY_OPEN, ARRAY_CLOSE, ARRAY_SEPARATOR} from '../consts/chars';
import CheddarTokens from '../tok/tks';
import CheddarLexer from '../tok/lex';
import CheddarAnyLiteral from './any';

export default class CheddarArrayToken extends CheddarLexer {
    exec() {
        
        if (this.getChar() !== ARRAY_OPEN)
            return this.error(CheddarError.EXIT_NOTFOUND);
        //TODO: parse tokens
        //TODO: when strong typing implemented, if preceded by type specifier
        //then use specific literal parser
        while(true) {
            this.jumpWhite();
            switch (this.getChar()) {
                case ARRAY_CLOSE:
                    return this.close();
                case ARRAY_SEPARATOR:
                    break;
                default:
                    this.Index--;
                    break;
            }
            let value = new CheddarAnyLiteral(this.Code, this.Index).exec();
            if (value instanceof CheddarLexer)
                this.Tokens = value;
            else if (value !== CheddarError.EXIT_NOTFOUND)
            // detects if it's not an explicit exit error
                return value;
        }
    }
}