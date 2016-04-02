import * as CheddarError from '../consts/err';
import CheddarParenthesizedExpression from './paren_expr';
import CheddarVariableToken from '../literals/var';
import {PropertyType} from '../consts/types';
//import CheddarExpressionToken from './expr';
import CheddarExpressionToken from './any'; // temporary
import CheddarArrayToken from './array';
import CheddarAnyLiteral from './any';
import CheddarTokens from '../tok/tks';
import CheddarLexer from '../tok/lex';

export default class CheddarPropertyToken extends CheddarLexer {
    exec() {
        this.open(false);
        this.Type = PropertyType.Property;

        let Initial = false;

        // Plans for property parsing:
        //  1. Match <variable> ("." | end)
        //  2. Match <variable (<expr>,*<expr>)?

        while (true) {

            this.jumpWhite();

            let attempt;
            if (Initial === false)
                attempt = this.attempt(CheddarVariableToken, CheddarAnyLiteral, CheddarParenthesizedExpression);
            else
                attempt = this.initParser(CheddarVariableToken).exec();

            Initial = true;

            if (!(attempt instanceof CheddarLexer))
                return this.error(attempt);

            this.Index = attempt.Index;
            this.Tokens = attempt;

            if (this.curchar === '(') {
                this.jumpWhite();
                this.Type = PropertyType.Method;

                let expr = this.initParser(CheddarArrayToken);
                let res = expr.exec('(', ')');

                this.Index = expr.Index;

                if (!(res instanceof CheddarLexer))
                    return this.error(expr);

                this.Tokens = expr;
            }
            
            if (this.curchar === '.') {
                ++this.Index;
                continue;
            }
            
            return this.close();
        }
    }
}
