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
import CheddarPrimitive from '../../../tokenizer/literals/primitive';
import CheddarTypedLiteral from '../../../tokenizer/parsers/typed';
import CheddarOperatorToken from '../../../tokenizer/literals/op';
import CheddarArrayToken from '../../../tokenizer/parsers/array';
import CheddarVariableToken from '../../../tokenizer/literals/var';

import CheddarVariable from '../env/var';
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
            DATA;

        // Handle Operator
        if (Operation instanceof CheddarOperatorToken) {

            TOKEN = this.shift(); // Get the value to operate upon

            // SPECIAL BEHAVIOR FOR ASSIGNMENT
            if (Operation.tok(0) === "=") {
                DATA = this.shift();

                if ((
                    !(DATA.Scope instanceof this.Scope.constructor) ||
                    DATA.Reference === null
                ) || Operation.tok(1) === OP_TYPE.UNARY) {
                    return CheddarErrorDesc.get(CheddarError.NOT_A_REFERENCE);
                }

                // NAVIGATE TOKEN AND DATA

                // Check if variable needs to be wrapped
                if ((TOKEN.Reference === null || !TOKEN.Reference)) {
                    TOKEN.Scope = DATA.Scope;
                    TOKEN.Reference = DATA.Reference;

                    DATA.Scope.manage(
                        DATA.Reference,
                        new CheddarVariable(TOKEN, {
                            Writeable: !DATA.const,
                            StrictType: null
                        })
                    );
                } else {
                    DATA.Scope.manage(DATA.Reference, TOKEN.Scope.Scope.get(TOKEN.Reference));
                }


                OPERATOR = TOKEN;

            } else if (!TOKEN.constructor.Operator.has(Operation.Tokens[0])) {
                // Ensure behavior exists for the types
                OPERATOR = CheddarError.NO_OP_BEHAVIOR;
            } else if (Operation.Tokens[1] === OP_TYPE.UNARY) {
                // Check if unary or binary operator, then execute
                OPERATOR = TOKEN.constructor.Operator.get(Operation.Tokens[0])(null, TOKEN);
            } else {
                DATA = this.shift(); // Get the other arg
                OPERATOR = TOKEN.constructor.Operator.get(Operation.Tokens[0])(DATA, TOKEN);
            }

            if (OPERATOR === CheddarError.NO_OP_BEHAVIOR) {
                return CheddarErrorDesc.get(OPERATOR)
                .replace(/\$0/g, Operation.Tokens[0])
                .replace(/\$1/g, TOKEN ? TOKEN.constructor.Name : "nil")
                .replace(/\$2/g, DATA ? DATA.constructor.Name : "nil");
            } else {
                this.put(OPERATOR);
            }

        } else if (Operation instanceof CheddarTypedLiteral) {
            // If it is a token, pass tokens to the associated class constructor

            TOKEN = Operation.Tokens.pop(); // Get the top token (e.g. CheddarNumber)

            // This means it is a cast/constructor because it has an additional arg
            if (Operation.Tokens.length) {
                /* TODO: Implement */;
            } else {
                // Otherwise locate the class to link
                //  and the construct it
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
            }
        } else if (Operation instanceof CheddarPropertyToken) {
            // If it's a property
            //  this includes functions

            // Lookup in cuurrent scope
            TOKEN = [];

            // Is a primitive
            // this includes `"foo".bar`
            if (Operation._Tokens[0] instanceof CheddarPrimitive) {
                OPERATOR = PRIMITIVE_LINKS.get(Operation._Tokens[0].constructor.name);
                if (OPERATOR) {
                    OPERATOR = new OPERATOR(...Operation._Tokens[0].Tokens);
                } else {
                    return CheddarError.UNLINKED_CLASS;
                }
            } else if (Operation._Tokens[0] instanceof CheddarVariableToken) {
                // Lookup variable -> initial variable name
                OPERATOR = this.Scope.accessor(Operation._Tokens[0]._Tokens[0]).Value;

                if (OPERATOR === CheddarError.KEY_NOT_FOUND || !OPERATOR) {
                    return CheddarError.KEY_NOT_FOUND;
                }
            } else {
                return CheddarError.MALFORMED_TOKEN;
            }

            // Advance variable tree
            // i dunno how to do this shit so ill do it later
            for (let i = 1; i < Operation._Tokens.length; i++) {
                // if it is a function call, call the function
                if (Operation._Tokens[i] instanceof CheddarArrayToken)
                    console.log("Yeah... no functions yet...\nIf you're complaining that why I haven't made them, make them yourself and make a PR\nwhy do I have to make everything?");
                else
                    console.log(":/ this is also not finished... will get to after a bit");
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
        while (this.InStack.length)
            if ((step = this.step()) !== true)
                return step;
        return this.close();
    }
}