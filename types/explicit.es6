// Explicit type literals
import * as CheddarError from '../err/list';
import CheddarParser from '../tok/parser';
import CheddarLexer from '../tok/lex';
import * as Literals from './types';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);
                
        this.parse(Literals.Token);
        this.jumpwhite();
        if (!this.jumpliteral(":"))
            this.error(CheddarError.EXIT_NOTFOUND);
        this.jumpwhite();
        
        return this.close();
    }
}