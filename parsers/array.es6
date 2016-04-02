import * as CheddarError from '../consts/err';
import {ARRAY_OPEN, ARRAY_CLOSE, ARRAY_SEPARATOR} from '../consts/chars';
import CheddarExpressionToken from './expr';
import CheddarTokens from '../tok/tks';
import CheddarLexer from '../tok/lex';

export default class CheddarArrayToken extends CheddarLexer {
    exec(OPEN = ARRAY_OPEN, CLOSE = ARRAY_CLOSE) {
        if (this.getChar() !== OPEN) {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
            
        while (true) {
            
            this.jumpWhite();
            
            let value = this.initParser(CheddarExpressionToken);
            let parsed = value.exec();
            
            this.Index = value.Index;
            if (parsed instanceof CheddarLexer)
                this.Tokens = value;
            else
                return this.error(parsed);
                
            this.jumpWhite();
            
            switch (this.getChar()) {
                case CLOSE:
                    return this.close();
                case ARRAY_SEPARATOR:
                    break;
                default:
                    return this.error(CheddarError.UNEXPECTED_TOKEN);
            }
        }
    }
}