import * as CheddarError from '../consts/err';
import CheddarLexer from '../tok/lex';

import CheddarVariableToken from '../literals/var';

export default class CheddarPropertyToken extends CheddarLexer {
    exec() {
        this.open(false);

        // Plans for property parsing:
        //  1. Match <variable> ("." | end)
        //  2. Match (<expr>, <expr>) if there is a (
        
        //IDK if classes will have same naming rules as variables
        while (true) {
            var variable = this.parse(CheddarVariableToken);
            switch (this.getChar()) {
                case '.': //TODO: get from chars
                    continue;
                case '(': //TODO: get from chars as well
                    //TODO: start function body
                    break;
                default:
                    this.Index--;
                    return this.close();
            }
        }

        if (this.Code[this.Index])
        
        return CheddarError.EXIT_NOTFOUND;
    }
}
