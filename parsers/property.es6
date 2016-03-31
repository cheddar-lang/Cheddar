import * as CheddarError from '../consts/err';
import CheddarVariableToken from '../literals/var';
import {PropertyType} from '../consts/types';
//import CheddarExpressionToken from './expr';
import CheddarExpressionToken from './any'; // temporary
import CheddarTokens from '../tok/tks';
import CheddarLexer from '../tok/lex';

export default class CheddarPropertyToken extends CheddarLexer {
    exec() {
        this.open(false);
        this.Type = PropertyType.Property;

        // Plans for property parsing:
        //  1. Match <variable> ("." | end)
        //  2. Match (<expr>, <expr>) if there is a (
        
        while (true) {
            
            this.jumpWhite();
            
            let variable = new CheddarVariableToken(this.Code, this.Index);
            let variableParsed = variable.exec();
            // Check if variable is valid
            if (!(variableParsed instanceof CheddarLexer))
                return this.error(variableParsed);
            
            this.Index  = variable.Index - 1;
            this.Tokens = variable; // Add Variable token to chain
            
            switch (this.getChar()) {
                case '.': //TODO: get from chars
                    continue;
                case '(': //TODO: get from chars as well
                    this.jumpWhite();
                    this.Type = PropertyType.Method;
                    
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
                default:
                    --this.Index;
                    return this.close();
            }
        }
    }
}
