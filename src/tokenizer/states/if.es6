import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import CheddarLexer from '../patterns/EXPLICIT';

export default class StatementIf extends CheddarLexer {
    exec() {
        this.open();

        let FORMAT = [CheddarExpressionToken, CheddarCodeblock];
        let IF = this.grammar(true, ['if', ...FORMAT]);
        let OUT;

        if (!IF instanceof CheddarLexer)
            return IF;

        console.log("A", this);
        while (this.lookAhead("else")) {
            console.log("B");
            this.jumpLiteral("else");
            if (this.lookAhead("if")) {
                console.log("C");
                // else if
                this.jumpLiteral("if");
                this.newToken("elif");
                this.jumpWhite();
                console.log("D");
                OUT = this.grammar(true, FORMAT);
                console.log("E");
            } else {
                // else
                console.log("F");
                this.newToken("else");
                this.jumpWhite();
                console.log("G");
                OUT = this.attempt(CheddarCodeblock);
                console.log("H");
                this.Index = OUT.Index;
                if (OUT instanceof CheddarLexer)
                    this.Tokens = OUT;
                console.log("I");
            }

            console.log("J");

            if (!(OUT instanceof CheddarLexer))
                return OUT;

            console.log("K");

            this.jumpWhite();
        }

        console.log("DONE");
    }
}