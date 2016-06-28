// == Evaluates Expressions ==
// Perhaps add config item to specify optimizations
// This first version will be a preliminary test
//  and won't have very many features
// Class operators and tokens  will be abstracted so
//  changed to `class` won't be deterimental to the
//  existing code.
// This will also allow classes to be forged for testing

// == Info ==
// config:link contains class linktage to
//  primitives, which functions as a basic
//  abstraction layer between the expression
//  parser and the tokenizer.
//   The CheddarClass itself provides   a
//   more thougrough abstraction between
//   the tokenizer and the rest of the code
//   itself

// Primitive <-> Class Links
import {PRIMITIVE_LINKS} from '../config/link';
import {TYPE as OP_TYPE} from '../../../tokenizer/consts/ops';

// Reference tokens
import CheddarPropertyToken from '../../../tokenizer/parsers/property';
import CheddarLiteral from '../../../tokenizer/parsers/any';
import CheddarOperatorToken from '../../../tokenizer/literals/op';
import CheddarArrayToken from '../../../tokenizer/parsers/array';
import CheddarVariableToken from '../../../tokenizer/literals/var';

import CheddarScope from '../env/scope';

import CheddarFunction from '../env/func';

import CheddarVariable from '../env/var';
import CheddarClass from '../env/class';
import NIL from '../consts/nil';

// Call stack wrapper
import CheddarCallStack from './callstack';

// Standard Error class
import CheddarError from '../consts/err';
import CheddarErrorDesc from '../consts/err_msg';

export default class CheddarEval extends CheddarCallStack {
    // To iterativaley evaluate the expression
    //  individual repeated steps would be taken
    //  which would also allow the debugger to
    //  function on the same foundation
    step() {
        const Operation = this.next();

        let OPERATOR,
            TOKEN,
            DATA,
            REFERENCE = null;

        // Handle Operator
        if (Operation instanceof CheddarOperatorToken) {

            TOKEN = this.shift(); // Get the value to operate upon

            // SPECIAL BEHAVIOR FOR REsASSIGNMENT
            if (Operation.tok(0) === "=") {
                DATA = this.shift();

                if ((
                    !(DATA.scope instanceof CheddarScope) ||
                    DATA.Reference === null
                ) || Operation.tok(1) === OP_TYPE.UNARY) {
                    return CheddarErrorDesc.get(CheddarError.NOT_A_REFERENCE);
                }

                if (DATA.scope.accessor(DATA.Reference).Writeable === false) {
                    // ERROR INTEGRATE
                    return `Cannot override constant ${DATA.Reference}`;
                }

                // NAVIGATE TOKEN AND DATA

                // Check if variable needs to be wrapped
                if ((TOKEN.Reference === null || !TOKEN.Reference)) {
                    TOKEN.scope = DATA.scope;
                    TOKEN.Reference = DATA.Reference;

                    DATA.scope.manage(
                        DATA.Reference,
                        new CheddarVariable(TOKEN, {
                            Writeable: !DATA.const,
                            StrictType: null
                        })
                    );
                } else {
                    DATA.scope.manage(DATA.Reference, TOKEN.scope.Scope.get(TOKEN.Reference));
                }


                OPERATOR = TOKEN;

            } else if (!TOKEN.constructor.Operator.has(Operation.Tokens[0])) {
                // Ensure behavior exists for the types
                OPERATOR = CheddarError.NO_OP_BEHAVIOR;
            } else if (Operation.Tokens[1] === OP_TYPE.UNARY) {
                // Check if unary or binary operator, then execute
                OPERATOR = (
                    TOKEN.constructor.Operator ||
                    TOKEN.Operator
                ).get(Operation.Tokens[0])(null, TOKEN);
            } else {
                DATA = this.shift(); // Get the other arg
                OPERATOR = (
                    DATA.constructor.Operator ||
                    DATA.Operator
                ).get(Operation.Tokens[0])(DATA, TOKEN);
            }

            if (OPERATOR === CheddarError.NO_OP_BEHAVIOR) {
                return CheddarErrorDesc.get(OPERATOR)
                .replace(/\$0/g, Operation.Tokens[0])
                .replace(/\$1/g, TOKEN ? (
                    TOKEN.constructor.Name || (
                        TOKEN.prototype instanceof CheddarClass
                        ? "Class"
                        : "nil"
                    )
                ) : "nil")
                .replace(/\$2/g, DATA ? (
                    DATA.constructor.Name || (
                        DATA.prototype instanceof CheddarClass
                        ? "Class"
                        : "nil"
                    )
                ) : "nil");
            } else {
                this.put(OPERATOR);
            }

        } else if (Operation instanceof CheddarLiteral) {
            // If it is a token, pass tokens to the associated class constructor
            TOKEN = Operation._Tokens[0]; // Get token

            // Do a lookup in the PRIMITIVE_LINKS class and get the link class
            if ((OPERATOR = PRIMITIVE_LINKS.get(TOKEN.constructor.name))) {
                // OPERATOR has the class to construct upon

                // Operator Construction
                OPERATOR = new OPERATOR(this.Scope);

                // Initialize operator class
                //  check if successful (true)
                if ((TOKEN = OPERATOR.init(...TOKEN.Tokens)) === true) {
                    // place on stack
                    this.put( OPERATOR );
                } else {
                    // return error
                    return TOKEN;
                }

            } else {
                return CheddarError.UNLINKED_CLASS;
            }
        } else if (Operation instanceof CheddarPropertyToken) {
            // If it's a property
            //  this includes functions

            // Is a primitive
            // this includes `"foo".bar`
            if (Operation._Tokens[0] instanceof CheddarLiteral) {
                TOKEN = Operation._Tokens[0]._Tokens[0];
                OPERATOR = PRIMITIVE_LINKS.get(TOKEN.constructor.name);
                if (OPERATOR) {
                    OPERATOR = new OPERATOR(this.Scope);

                    if ((TOKEN = OPERATOR.init(...TOKEN.Tokens)) !== true) {
                        return TOKEN;
                    }
                } else {
                    return CheddarError.UNLINKED_CLASS;
                }
            } else if (Operation._Tokens[0] instanceof CheddarVariableToken) {
                // Lookup variable -> initial variable name
                OPERATOR = this.Scope.accessor(Operation._Tokens[0]._Tokens[0]);

                if (!OPERATOR || OPERATOR === CheddarError.KEY_NOT_FOUND) {
                    return CheddarErrorDesc.get(CheddarError.KEY_NOT_FOUND)
                    .replace('$0', Operation._Tokens[0]._Tokens[0]);
                }

                OPERATOR = OPERATOR.Value;
            } else {
                return CheddarError.MALFORMED_TOKEN;
            }

            // Advance variable tree
            // i dunno how to do this shit so ill do it later
            for (let i = 1; i < Operation._Tokens.length; i++) {
                // if it is a function call, call the function
                if (Operation._Tokens[i] instanceof CheddarArrayToken) {

                    if (!(OPERATOR instanceof CheddarFunction)) {
                        // ERROR INTEGRATE
                        return "THATS NOT A FUNCTION YOU IDIOT";
                    }

                    DATA = [];
                    TOKEN = Operation._Tokens[i]._Tokens;
                    let evalres; // Evaluation result
                    for (let i = 0; i < TOKEN.length; i++) {
                        evalres = new CheddarEval(
                            TOKEN[i],
                            this.Scope
                        );
                        evalres = evalres.exec();
                        if (typeof evalres === "string") {
                            return evalres;
                        } else {
                            DATA.push(evalres);
                        }
                    }

                    OPERATOR = OPERATOR.exec(
                        DATA,
                        REFERENCE
                    );
                } else {
                    if (!OPERATOR.accessor || !(DATA = OPERATOR.accessor(Operation._Tokens[i]._Tokens[0]))) {
                        // ERROR INTEGRATE
                        return `${
                            Operation._Tokens[i - 1]._Tokens[0]
                        } has no property ${
                            Operation._Tokens[i]._Tokens[0]
                        }`;
                    }

                    if (DATA instanceof CheddarFunction)
                        REFERENCE = OPERATOR;

                    OPERATOR = DATA.Value;
                }
            }

            this.put( OPERATOR );
        } else {
            return "An unhandled token was encountered";
        }

        return true;
    }

    // Evaluate entire call stack
    //  this stepts until the call
    //  stack or `InStack` is empty
    exec() {
        let step;
        while (!!this.InStack[this._csi])
            if ((step = this.step()) !== true)
                return step;
        return this.close();
    }
}