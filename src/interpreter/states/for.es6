import NIL from '../core/consts/nil';
import CheddarExec from '../exec';
import CheddarEval from '../core/eval/eval';
import CheddarBool from '../core/primitives/Bool';
import CheddarScope from '../core/env/scope';
import CheddarAssign from './assign';
import Signal from '../signal';

export default class CheddarFor {
    constructor(toks, scope) {
        this.toks = toks;
        this.scope = scope;
    }

    exec() {
        // Create `for`'s scope, inherits from parent
        let SCOPE;

        // Determine whether for..in or for (a; b; c)
        // 4 tokens === for..in
        if (this.toks._Tokens.length === 4) {
            let vars, // Variable array for destructuring
                target, // Item to loop over
                codeblock; // Codeblock to execute

            // First token is the variable(s) name(s)
            vars = this.toks._Tokens[1];

            // Handle destructuring
            if (vars.constructor.name === "CheddarArrayToken") {
                // Extract the variable name from inside the tokens
                vars = vars._Tokens.map(variable => variable._Tokens[0]);
            } else {
                // It's just a normal variable
                // wrap it as an array
                vars = [vars._Tokens[0]];
            }

            // Evaluate the expression
            target = new CheddarEval(
                this.toks._Tokens[2], // The target token
                SCOPE // The generated scope
            ).exec();

            // Propogate errors
            if (typeof target === 'string')
                return target;

            // Iterate over the result
            if (target.value) {
                let CheddarString = require('../core/primitives/String');
                let init = require('../../helpers/init');
                let cvar = require('../core/env/var');
                // TODO: Actually make generators
                // Currently just extract value and iterate over that
                for (var i = 0; i < target.value.length; i++) {
                    SCOPE = new CheddarScope(this.scope);

                    // Check if destructuring properly
                    if (i === 0 && vars.length > 1) {
                        return `Unused variables in for destructuring: \`${vars.slice(1).join(", ")}\``;
                    }

                    // If it has the variable and it's not writable
                    if (SCOPE.has(vars[0]) && SCOPE.accessor(vars[0]).Writeable === false) {
                        return `Cannot overwrite constant \`${vars[0]}\``;
                    }

                    if (typeof target.value === 'string') {
                        // It is an array
                        SCOPE.manage( // The setter
                            vars[0], // set it to the first variable
                            // Convert the item to a CheddarString, wrap in a
                            // CheddarVariable
                            new cvar(init(CheddarString, target.value[i]))
                        );
                    } else {
                        // It's an array
                        SCOPE.manage( // the setter
                            vars[0], // the variable name, the first one
                            // Wrap the array item in a CheddarVariable
                            new cvar(target.value[i])
                        );
                    }

                    // Execute the codeblock
                    codeblock = new CheddarExec(
                        // The codeblock is at the 3rd token
                        // Actual tokens are wrapped
                        // Can be accessed through ._Tokens[0]
                        this.toks._Tokens[3]._Tokens[0],
                        SCOPE // Pass the generated scope
                    ).exec();

                    // If it errored, it returned a string, error.
                    if (typeof codeblock === "string")
                        return codeblock;
                }

                // Return the result of codeblock
                // The implicit output will become
                // the last iteration response
                return codeblock;
            } else {
                return `Cannot iterate over ${
                    target.constructor.Name ||
                    target.Name ||
                    "object"
                }`;
            }
        }
        else {

            let pool0,
                poola, poolb, poolc, // Token caching
                res, bool, // Storage
                ralloc, // Pending result
                trs, initset; // Temp

            // Execute the initial setup
            pool0 = this.toks._Tokens[1];

            if (pool0.constructor.name === "StatementAssign") {
                initset = trs = new CheddarAssign(pool0, this.scope, true).exec();
            }
            else {
                trs = new CheddarEval(pool0, this.scope).exec();
            }

            if (typeof trs === 'string')
                return trs;

            // Cache tokens to avoid new lookup
            poola = this.toks._Tokens[2];
            poolb = this.toks._Tokens[3];
            poolc = this.toks._Tokens[4];

            while (true) {
                SCOPE = new CheddarScope(this.scope);
                if (initset) SCOPE.manage(...initset);

                // Condition
                res = new CheddarEval(poola, SCOPE);
                res = res.exec();

                if (typeof res === 'string')
                    return res;

                bool = new CheddarBool(SCOPE);

                if (bool.init(res) && bool.value === true) {
                    ralloc = new CheddarExec(
                        poolc._Tokens[0],
                        SCOPE
                    );

                    ralloc = ralloc.exec();

                    if (typeof ralloc === "string")
                        break;

                    if (ralloc instanceof Signal) {
                        if (ralloc.is(Signal.BREAK)) {
                            ralloc = ralloc.data;
                            break;
                        }
                    }

                    trs = new CheddarEval(poolb, SCOPE);
                    trs.exec();

                    if (typeof trs === 'string')
                        return trs;

                    // Setup next iteration
                    if (initset) {
                        initset[1] = SCOPE.accessor(initset[0]);
                    }
                }
                else {
                    break;
                }
            }

            return ralloc;
        }
    }
}