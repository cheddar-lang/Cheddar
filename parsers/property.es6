import * as CheddarError from '../consts/err';
//import CheddarExpressionToken from './expr';
import CheddarExpressionToken from './any'; // temporary
import CheddarTokens from '../tok/tks';
import CheddarLexer from '../tok/lex';

import CheddarVariableToken from '../literals/var';

export default class CheddarPropertyToken extends CheddarLexer {
    exec() {
        this.open(false);

        // Plans for property parsing:
        //  1. Match <variable> ("." | end)
        //  2. Match (<expr>, <expr>) if there is a (
        
        //IDK if classes will have same naming rules as variables
        // Well there's `Token`s which aren't allowed to have numbres
        // @Downgoat: Will class names be allowed to have numbers
        parse: while (true) {
            
            this.jumpWhite();
            
            var variable = new CheddarVariableToken(this.Code, this.Index).exec();
            
            // Check if variable is valid
            if (!(variable instanceof CheddarLexer))
                return this.variable;
            
            this.Index  = variable.Index - 1;
            this.Tokens = variable; // Add Variable token to chain
        
            switch (this.getChar()) {
                case '.': //TODO: get from chars
                    continue;
                case '(': //TODO: get from chars as well
                    this.jumpWhite();
                    
                    // Parse function call
                    // Parse with CheddarExpressionToken
                    let expr,
                        res;
                    let tokens = new CheddarTokens([]);
                    while (true) {
                        this.jumpWhite();
                        
                        expr = new CheddarExpressionToken(this.Code, this.Index);
                        res = expr.exec(",)");
                        
                        if (!(res instanceof CheddarLexer) && res !== CheddarError.EXIT_NOTFOUND)
                            return this.error(res);
                            
                        if (res !== CheddarError.EXIT_NOTFOUND)
                            tokens.push(expr);
                        
                        this.Index = expr.Index;
                        
                        this.jumpWhite();
                        
                        let chr = this.getChar();
                        switch (chr) {
                            case ',':
                                continue;
                            case ')':
                                break;
                            default:
                                return this.error(CheddarError.UNEXPECTED_TOKEN);
                        }
                        
                        break;
                    }
                    
                    this.Tokens = tokens;
                    
                    return this.close();
                    break parse;
                default:
                    --this.Index;
                    return this.close();
            }
        }

        return CheddarError.EXIT_NOTFOUND;
    }
}
