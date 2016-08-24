import CheddarVariable from '../core/env/var';
import CheddarClass from '../core/env/class';
import CheddarEval from '../core/eval/eval';
import NIL from '../core/consts/nil';

export default class CheddarAssign {
    constructor(tokl, scope) {
        this.assignt = tokl.tok(0); // assignment type
        this.assignl = tokl.tok(1); // name & type?
        this.toks = tokl;

        this.scope = scope;
    }

    exec() {
        let varname = this.assignl.tok(0)._Tokens[0];
        if (this.scope.has(varname)) {
            // ERROR INTEGRATE
            return `${varname} has already been defined`;
        }

        // Strict typing
        let stricttype = this.assignl.tok(1) ?
            this.assignl.tok(1)._Tokens[0] :
            null;

        if (stricttype && this.scope.has(stricttype) && !((
                stricttype = this.scope.accessor(stricttype).Value
            ).prototype instanceof CheddarClass)) {
                return `${stricttype} is not a class`;
        }

        let res;

        if (this.toks.tok(2)) {
            let val = new CheddarEval({ _Tokens: [this.toks.tok(2)] }, this.scope);
            if (!((val = val.exec()) instanceof CheddarClass || val.prototype instanceof CheddarClass))
                return val;

            if (stricttype && !(val instanceof stricttype)) {
                return `Attempted to set \`${varname}\` to a \`${
                    val.Name ||
                    val.constructor.Name ||
                    "object"
                }\`, expected \`${
                    stricttype.Name ||
                    stricttype.constructor.Name ||
                    "object"
                }\``;
            }

            val.scope = this.scope;
            val.Reference = varname;

            res = this.scope.manage(varname,
                new CheddarVariable(val, {
                    Writeable: this.assignt !== "const",
                    StrictType: stricttype
                })
            );
        }
        else {
            res = this.scope.manage(varname,
                new CheddarVariable(new NIL, {
                    Writeable: this.assignt !== "const",
                    StrictType: stricttype
                })
            );
        }

        if (res !== true) {
            return `\`${this.assignl.tok(0)}\` is a reserved keyword`;
        }
    }
}