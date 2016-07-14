import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import CheddarCustomLexer from '../parsers/custom';
import CheddarLexer from '../patterns/EXPLICIT';
import * as CheddarError from '../consts/err';

export default class StatementIf extends CheddarLexer {
    exec() {
        this.open();

        if (!this.lookAhead("if"))
            return CheddarError.EXIT_NOTFOUND;

        this.jumpLiteral("if");

        let EXPRESSION = CheddarCustomLexer(CheddarExpressionToken, true);

        // Match the `expr { block }` format
        let FORMAT = ['(', EXPRESSION, ')', CheddarCodeblock, CheddarError.EXPECTED_BLOCK];

        // Match initial `if`
        let IF = this.grammar(true, FORMAT);
        if (IF === CheddarError.EXIT_NOTFOUND)
            return IF;
        else if (!(IF instanceof CheddarLexer))
            return this.error(IF);

        while (this.lookAhead("else")) {
            this.jumpLiteral("else");

            if (this.lookAhead("if")) {
                // else-if Statement

                this.jumpLiteral("if");
                this.newToken("elif");
                this.jumpWhite();

                let OUT = this.grammar(true, FORMAT);

                if (!OUT instanceof CheddarLexer)
                    return this.error(OUT);
            }
            else {
                // else Statement

                this.newToken("else");
                this.jumpWhite();

                let RUN = this.initParser(CheddarCodeblock);
                let RES = RUN.exec();

                this.Index = RES.Index || RUN.Index;

                if (RUN.Errored || !RES instanceof CheddarLexer)
                    return this.error(RES);

                this.Tokens = RES;
            }

            this.jumpWhite();
        }

        return this.close();
    }
}
