import CheddarParenthesizedExpression from './paren_expr';
import CheddarVariableToken from '../literals/var';
import {PropertyType} from '../consts/types';
import CheddarArrayToken from './array';
import CheddarAnyLiteral from './any';
import CheddarLexer from '../tok/lex';
import CheddarPrimitive from '../literals/primitive';

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
                console.log(expr, res);
                if (!(res instanceof CheddarLexer))
                    return this.error(res);

                this.Tokens = expr;
            }

            if (this.curchar === '.') {
                ++this.Index;
                continue;
            }

            console.log("DEBUG", this);

            if (this._Tokens.length === 1 && this._Tokens[0] instanceof CheddarPrimitive)
                return this.close(this._Tokens[0]);
            else
                return this.close();
        }
    }
}
