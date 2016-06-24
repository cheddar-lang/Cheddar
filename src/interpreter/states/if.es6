import NIL from '../core/consts/nil';
import CheddarExec from '../exec';
import CheddarEval from '../core/eval/eval';
import CheddarBool from '../core/primitives/Bool';
import CheddarScope from '../core/env/scope';
import * as CheddarError from '../core/consts/err';
import CheddarErrorMessage from '../core/consts/err_msg';

export default class CheddarIf {
    constructor(toks, scope) {
        this.toks = toks;
        this.Scope = scope;
    }

    exec() {
        let expr,  // Conditional Expression
            val,   // Result Holder
            evalf; // Evaluation frame

        let tok;
        let cs = 0;

        while ((tok = this.toks._Tokens[cs++]) !== undefined) {
            switch (tok) {
                case "":     // If-statement
                case "elif": // Else-if statement
                    expr = this.toks._Tokens[cs++];
                    expr = new CheddarEval(expr, this.Scope).exec();

                    // Check if expression is true
                    val = new CheddarBool(this.Scope);
                    // Ensure: a. Succesful cast; b. evals to true
                    if (val.init(expr) && val.value === true) {
                        evalf = new CheddarExec(
                            this.toks._Tokens[cs++]._Tokens[0], // Code Block
                            new CheddarScope(this.Scope)  // New scope inheriting
                        );

                        return evalf.exec();
                    } else {
                        cs++;
                        break;
                    }
                case "else": // Else statement
                    evalf = new CheddarExec(
                        this.toks._Tokens[cs++]._Tokens[0],
                        new CheddarScope(this.Scope)
                    );

                    return evalf.exec();
                default:
                    console.log("== START STACK DUMP ==");
                    console.log(this.toks);
                    console.log(tok);
                    console.log("== END STACK DUMP ==");
                    return CheddarErrorMessage.get(CheddarError.MALFORMED_TOKEN).replace(/\$0/, this.toks._Tokens.length);
            }
        }
    }
}