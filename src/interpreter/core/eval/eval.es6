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

function to_value(variable, parent) {
    // Check if getter
    if (variable.Value) {
        return variable.Value;
    } else if (variable.getter) {
        return variable.getter.exec([], parent);
    } else {
        // ERROR INTEGRATE
        return `Attempted to accesses variable without value`;
    }
}

function set_value(value, child) {
    // The CheddarVariable() wrapping the value
    let variable = value.scope.accessor(value.Reference);

    // If the result is being set to a variable
    if (child instanceof CheddarVariable) {
        child = child.Value; // extract it's literal value
    }

    // If there's a setter
    if (variable.setter !== null) {
        // Run the setter.
        // Pass the target value (child) as an arg
        // Run in context of value (`self`)
        child = variable.setter.exec([child], value);
    }

    // Set the correct reference on the scope
    child.scope = value.scope;
    child.Reference = value.Reference;

    // Get the scope the LHS is in.
    let rep = value.scope.manage(
        // Change the var name
        value.Reference,
        // to the resulting value
        new CheddarVariable(child, {
            Writeable: true,
            StrictType: variable.StrictType
        })
    );

    if (rep !== true) {
        // ERROR INTEGRATE
        return `\`${value.Reference}\` is a reserved keyword`;
    }
}

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
            NAME,
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

                // Call `set_value` function
                DATA = set_value(DATA, TOKEN);

                // If it errored
                if (DATA !== true) {
                    return DATA;
                }

                OPERATOR = TOKEN;

            } else if (Operation.Tokens[1] === OP_TYPE.UNARY) {
                NAME = TOKEN.constructor.Operator ||
                       TOKEN.Operator;
                // It is an Unary operator use TOKEN as RHS, null as LHS
                if (NAME.has(Operation.Tokens[0])) {
                    OPERATOR = NAME.get(Operation.Tokens[0])(null, TOKEN);
                } else {
                    OPERATOR = CheddarError.NO_OP_BEHAVIOR;
                }
            } else {
                // Binary operator. DATA is RHS, TOKEN is LHS
                DATA = this.shift(); // Get the other arg

                NAME = DATA.constructor.Operator ||
                       DATA.Operator;

                if (NAME.has(Operation.Tokens[0])) {
                    OPERATOR = NAME.get(Operation.Tokens[0])(DATA, TOKEN);
                } else {
                    OPERATOR = CheddarError.NO_OP_BEHAVIOR;
                }
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

        } else if (Operation instanceof CheddarPropertyToken) {
            // If it's a property
            //  this includes functions

            // Is a primitive
            // this includes `"foo".bar`
            if (Operation._Tokens[0] instanceof CheddarLiteral) {
                // Get the token's value
                TOKEN = Operation._Tokens[0]._Tokens[0];

                // Get the class associated with the token
                OPERATOR = PRIMITIVE_LINKS.get(TOKEN.constructor.name);
                if (OPERATOR) {
                    // Set the name to be used in errors
                    NAME = OPERATOR.Name || "object";

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

                // Set the name to be used in errors, extracted from token
                NAME = Operation._Tokens[0]._Tokens[0];
                if (!OPERATOR || OPERATOR === CheddarError.KEY_NOT_FOUND) {
                    return CheddarErrorDesc.get(CheddarError.KEY_NOT_FOUND)
                    .replace('$0', NAME);
                }

                OPERATOR = to_value(OPERATOR);
                if (typeof OPERATOR === "string")
                    return OPERATOR;
            } else {
                return CheddarError.MALFORMED_TOKEN;
            }

            // Advance variable tree
            for (let i = 1; i < Operation._Tokens.length; i++) {
                // if it is a function call, call the function
                if (Operation._Tokens[i] instanceof CheddarArrayToken) {

                    if (!(OPERATOR instanceof CheddarFunction)) {
                        // ERROR INTEGRATE
                        return `\`${NAME}\` is not a function`;
                    }

                    DATA = [];

                    // Get the array of args from the token
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
                    // Else it is a property

                    // Attempt to access the accessor
                    // then use the accessor to get the token
                    if (!OPERATOR.accessor || !(DATA = OPERATOR.accessor(Operation._Tokens[i]._Tokens[0]))) {
                        // ERROR INTEGRATE
                        return `${
                            NAME
                        } has no property ${
                            Operation._Tokens[i]._Tokens[0]
                        }`;
                    }

                    NAME = Operation._Tokens[i]._Tokens[0];

                    // Set the previous item to the REFERENCE
                    REFERENCE = OPERATOR;

                    OPERATOR = to_value(DATA, REFERENCE);

                    if (typeof OPERATOR === "string")
                        return OPERATOR;
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