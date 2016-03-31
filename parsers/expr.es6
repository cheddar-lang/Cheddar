// Cheddar Expression Parser
import * as CheddarError from '../consts/err';

import CheddarPropertyToken from './property';
import CheddarAnyLiteral from './any';
import CheddarLiteral from '../literals/literal';
import CheddarLexer from '../tok/lex';
import {OP, UOP, EXPR_OPEN, EXPR_CLOSE} from '../consts/ops';

export default class CheddarExpressionToken extends CheddarLexer {
    // set recurse to the char
    // that the parser should
    // stop an expression on
    exec(recurse = false) {
        main: while (true) {
            
            this.jumpWhite();
            
            // Attempt to identify what the item by:
            //  1. Attempt to find literal
            //  2. Attempt to find variable 
            //  3. Attempt to find operator
            //  4. Attempt to find subexpression
            //  5. (if recurse) Attempt to check if recurse closes
            
            // TODO:  Add operator support
            const LiteralAttempts = [CheddarPropertyToken, CheddarAnyLiteral];
            
            let attempt,
                result;
                
            for (let i = 0; i < LiteralAttempts.length; i++) {
                attempt = new LiteralAttempts[i](this.Code, this.Index);
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
            
            // DOES NOT WORK D:
            // Part 4. Subexpression finding
            /*if (chr === EXPR_OPEN) {
                attempt = new CheddarExpressionToken(this.Code, this.Index);
                result = attempt.exec(')');
                
                if (result instanceof CheddarLexer) {
                    this.Index = attempt.Index;
                    this.Tokens = attempt;
                    continue main;
                } else if (result !== CheddarError.EXIT_NOTFOUND) {
                    this.Index = attempt.Index;
                    return this.error(result);
                }
            }
            
            // Part 5. Recursion Detection
            if (recurse)
                if (recurse.indexOf(chr) > -1)
                    return this.close();
                else
                    return this.error(CheddarError.UNEXPECTED_TOKEN);
            */
            return this.close();
        }
    }
}