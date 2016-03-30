// Cheddar Expression Parser
import * as CheddarError from '../consts/err';
import CheddarAnyLiteral from './any';
import CheddarLiteral from '../literals/literal';
import CheddarLexer from '../tok/lex';
import {OP, UOP} from '../consts/ops';

export default class CheddarExpressionToken extends CheddarLexer {
    // set recurse to the char
    // that the parser should
    // stop an expression on
    exec(recurse = false) {
        let chr;
        while (chr = this.getChar()) {
            // TODO: expression code goes here
            
            this.jumpWhite();
            
            let c_index = --this.Index;
            
            // Attempt to identify what the item by:
            //  1. Attempt to find literal
            //  2. Attempt to find token
            //  3. (TODO: Way Later) Attempt to find variable 
            //  4. Attempt to find operator
            //  5. Attempt to find subexpression
            //  6. (if recurse) Attempt to check if recurse closes
            
            const types = [CheddarAnyLiteral, CheddarLiteral];
            let attempt;

            // TODO: Check which one of `types` rerturns true
        }
    }
}