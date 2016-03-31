// Cheddar Expression Parser
import * as CheddarError from '../consts/err';

import CheddarPropertyToken from './property';
import CheddarAnyLiteral from './any';
import CheddarLiteral from '../literals/literal';
import CheddarLexer from '../tok/lex';
import {OP, UOP} from '../consts/ops';

export default class CheddarExpressionToken extends CheddarLexer {
    // set recurse to the char
    // that the parser should
    // stop an expression on
    exec(recurse = false) {
        main: while (true) {
            console.log(this);
            // TODO: expression code goes here
            
            this.jumpWhite();
            
            // Attempt to identify what the item by:
            //  1. Attempt to find literal
            //  2. Attempt to find variable 
            //  3. Attempt to find operator
            //  4. Attempt to find subexpression
            //  5. (if recurse) Attempt to check if recurse closes
                
            // NOTE: I will revise this code after
            // I finish a draft of expression parsing
            
            const LiteralAttempts = [CheddarAnyLiteral, CheddarPropertyToken, CheddarLiteral];
            
            let attempt,
                result;
                
            for (let i = 0; i < LiteralAttempts.length; i++) {
                attempt = new LiteralAttempts[i](this.Code, this.Index)
                result = attempt.exec();
                
                if (result instanceof CheddarLexer) {
                    this.Index = attempt.Index;
                    this.Tokens = attempt;
                    continue main;
                } else if (result !== CheddarError.EXIT_NOTFOUND) {
                    this.Index = attempt.Index;
                    return this.error(result);
                }
            }
            
            return this.close();
        }
    }
}