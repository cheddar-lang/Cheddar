import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import CheddarLexer from '../patterns/EXPLICIT';
import * as CheddarError from '../consts/err';

var util = require('util')

export default class StatementIf extends CheddarLexer {
    exec() {
        this.open();

        if (!this.lookAhead("if"))
            return CheddarError.EXIT_NOTFOUND;

        let FORMAT = [CheddarExpressionToken, CheddarCodeblock];
        let IF = this.grammar(true, ['if', ...FORMAT]);
        let OUT;

        if (!IF instanceof CheddarLexer)
            return IF;

        console.log(util.inspect(this, {showHidden: false, depth: null}), this.Index)
        while (this.lookAhead("else")) {
            this.jumpLiteral("else");
            if (this.lookAhead("if")) {
                // else if

                this.jumpLiteral("if");
                this.newToken("elif");
                this.jumpWhite();

                OUT = this.grammar(true, FORMAT);
            }
            else {
                // else
                this.newToken("else");
                this.jumpWhite();

                OUT = this.attempt(CheddarCodeblock);

                this.Index = OUT.Index;
                if (OUT instanceof CheddarLexer)
                    this.Tokens = OUT;
            }

            if (!(OUT instanceof CheddarLexer))
                return OUT;

            this.jumpWhite();
        }

        return this
    }
}