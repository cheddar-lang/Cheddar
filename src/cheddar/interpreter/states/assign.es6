import CheddarVariable from '../core/env/var';
import CheddarClass from '../core/env/class';
import CheddarEval from '../core/eval/eval';
import NIL from '../core/consts/nil';

export default class CheddarAssign {
    constructor(tokl, scope, noassign) {
        this.assignt = tokl._Tokens[0]; // assignment type
        this.assignl = tokl._Tokens[1]; // name & type?
        this.toks = tokl;

        this.scope = scope;

        this.noassign = noassign;
    }

    exec() {
        let varname = this.assignl._Tokens[0]._Tokens[0];
        if (this.scope.has(varname)) {
            // ERROR INTEGRATE
            return `${varname} has already been defined`;
        }

        // Strict typing
        let stricttype = this.assignl._Tokens[1] ?
            this.assignl._Tokens[1]._Tokens[0] :
            null;

        if (stricttype && this.scope.has(stricttype) && !((
                stricttype = this.scope.accessor(stricttype).Value
            ).prototype instanceof CheddarClass)) {
                return `${stricttype} is not a class`;
        }

        let res, value;

        if (this.toks._Tokens[2]) {

            let val = new CheddarEval({ _Tokens: [this.toks._Tokens[3]] }, this.scope);
            if (!((val = val.exec()) instanceof CheddarClass || val.prototype instanceof CheddarClass))
                return val;

            if (this.toks._Tokens[2] === ':=') {
                stricttype = val.constructor;
            }

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

            value = new CheddarVariable(val, {
                Writeable: this.assignt !== "const",
                StrictType: stricttype
            });

            if (this.noassign) return [varname, value];

            res = this.scope.manage(varname, value);
        }
        else {
            value = new CheddarVariable(new NIL, {
                Writeable: this.assignt !== "const",
                StrictType: stricttype
            });

            if (this.noassign) return [varname, value];

            res = this.scope.manage(varname, value);
        }

        if (res !== true) {
            return `\`${this.assignl._Tokens[0]}\` is a reserved keyword`;
        }
    }
}
