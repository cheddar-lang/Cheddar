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

        if (!IF instanceof CheddarLexer)
            return IF;

        while (this.lookAhead("else")) {
            this.jumpLiteral("else");
            if (this.lookAhead("if")) {
                // else if

                this.jumpLiteral("if");
                this.newToken("elif");
                this.jumpWhite();

                let OUT = this.grammar(true, FORMAT);

                if (!OUT instanceof CheddarLexer)
                    return OUT;
            }
            else {
                // else
                this.newToken("else");
                this.jumpWhite();

                let RUN = this.initParser(CheddarCodeblock);
                let RES = RUN.exec();

                this.Index = RES.Index || RUN.Index;

                if (RUN.Errored || !RES instanceof CheddarLexer)
                    return RES;

                this.Tokens = RES;
            }

            this.jumpWhite();
        }

        return this.close();
    }
}
