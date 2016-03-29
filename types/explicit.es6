// Explicit type literals
import * as CheddarError from '../err/list';
import CheddarLexer from '../tok/lex';
import * as Literals from './types';

export default class CheddarAnyLiteral extends CheddarLexer {
    exec() {
        this.open(false);
                
        this.parse(Literals.Token);
        this.jumpWhite();
        if (!this.jumpLiteral(":"))
            this.error(CheddarError.EXIT_NOTFOUND);
        this.jumpWhite();
        // this.parse(<Expression>); // add way to parse expression
        
        return this.close();
    }
}
