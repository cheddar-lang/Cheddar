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
import {PRIMITIVE_LINKS, EVALUATED_LINKS} from '../config/link';
import {TYPE as OP_TYPE, EXCLUDE_META_ASSIGNMENT as REG_OPS} from '../../../tokenizer/consts/ops';

// Reference tokens
import CheddarPropertyToken from '../../../tokenizer/parsers/property';
import CheddarLiteral from '../../../tokenizer/literals/literal';
import CheddarParenthesizedExpressionToken from '../../../tokenizer/parsers/paren_expr';
import CheddarOperatorToken from '../../../tokenizer/literals/op';
import CheddarExpressionToken from '../../../tokenizer/parsers/expr';
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

function to_value(variable, parent, name) {
    // Check if getter
    if (variable.Value) {
        return variable.Value;
    } else if (variable.getter) {
        let res = variable.getter.exec([], parent);
        res.Reference = name;
        res.scope = parent;
        return res;
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
    let rep = value.scope.enforceset(
        // Change the var name
        value.Reference,
        // to the resulting value
        child
    );

    return rep;
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
            TARGET,
            REFERENCE = null;

        // Handle Operator
        if (Operation instanceof CheddarOperatorToken) {

            let SETSELF = false; // If the operator is a self-asignning operator

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

                // Call `set_value` function
                DATA = set_value(DATA, TOKEN);

                // If it errored
                if (DATA !== true) {
                    return DATA;
                }

                OPERATOR = TOKEN;

            } else if (Operation.Tokens[1] === OP_TYPE.UNARY) {
                NAME = TOKEN.Operator;
                // It is an Unary operator use TOKEN as RHS, null as LHS
                if (NAME.has(Operation.Tokens[0])) {
                    OPERATOR = NAME.get(Operation.Tokens[0])(null, TOKEN);
                } else {
                    OPERATOR = CheddarError.NO_OP_BEHAVIOR;
                }
            } else {
                // Binary operator. DATA is LHS, TOKEN is RHS
                DATA = this.shift(); // Get the other arg

                NAME = DATA.Operator;

                TARGET = Operation.Tokens[0]; // The operator

                // Set LHS to LHS * RHS

                // if it ends with `=`, given `a *= b` do `a = a * b`
                // given if the above is true, set the `SETSELF` to true
                if (TARGET.endsWith('=') && !REG_OPS.has(TARGET)) {
                    SETSELF = true;
                    TARGET = TARGET.slice(0,-1);
                }

                if (NAME.has(TARGET)) {
                    OPERATOR = NAME.get(TARGET)(DATA, TOKEN);
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
            } else if (typeof OPERATOR === 'string') {
                return OPERATOR;
            } else {
                // Perform re-assignment
                if (SETSELF) {
                    // DATA, TOKEN
                    if ((
                        !(DATA.scope instanceof CheddarScope) ||
                        DATA.Reference === null
                    ) || Operation.tok(1) === OP_TYPE.UNARY) {
                        return CheddarErrorDesc.get(CheddarError.NOT_A_REFERENCE);
                    }

                    // Call `set_value` function
                    DATA = set_value(DATA, OPERATOR);

                    // If it errored
                    if (DATA !== true) {
                        return DATA;
                    }
                }

                this.put(OPERATOR);
            }

        } else if (Operation instanceof CheddarPropertyToken || Operation instanceof CheddarLiteral) {
            // If it's a property
            //  this includes functions

            // Is a primitive
            // this includes `"foo".bar`
            if ((Operation._Tokens[0] instanceof CheddarLiteral) ||
                (Operation instanceof CheddarLiteral)) {

                if (Operation instanceof CheddarLiteral) {
                    TOKEN = Operation;
                } else {
                    // Get the token's value
                    TOKEN = Operation._Tokens[0]._Tokens[0];
                }

                // Get the class associated with the token
                if ((OPERATOR = PRIMITIVE_LINKS.get(TOKEN.constructor.name))) {
                    // Set the name to be used in errors
                    NAME = OPERATOR.Name || "object";

                    OPERATOR = new OPERATOR(this.Scope);

                    if ((TOKEN = OPERATOR.init(...TOKEN.Tokens)) !== true) {
                        return TOKEN;
                    }

                    // Exit if it's a raw literal
                    if (Operation instanceof CheddarLiteral) {
                        this.put(OPERATOR);
                        return true;
                    }
                } else if ((OPERATOR = EVALUATED_LINKS.get(TOKEN.constructor.name))) {
                    OPERATOR = OPERATOR(...TOKEN.Tokens);
                } else {
                    return CheddarError.UNLINKED_CLASS;
                }
            } else if (Operation._Tokens[0] instanceof CheddarParenthesizedExpressionToken) {
                // Evaluate
                OPERATOR = new CheddarEval(
                    Operation._Tokens[0],
                    this.Scope
                );

                OPERATOR = OPERATOR.exec();

                if (typeof OPERATOR === "string") {
                    return OPERATOR;
                }

                NAME = OPERATOR.constructor.Name
                    || OPERATOR.Name
                    || "object";

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
                // we know this if the marker is a (
                if (Operation._Tokens[i] === "(") {
                    ++i; // Go to the actual function token

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
                            { _Tokens:[TOKEN[i]] },
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
                }
                // if it is a class call, initalize it
                // we know this if the marker is a {
                else if (Operation._Tokens[i] === "{") {
                    // Go to the token...
                    ++i;

                    // Make sure it's a class
                    if (!(OPERATOR.prototype instanceof CheddarClass)) {
                        // ERROR INTEGRATE
                        return `${NAME} is not a class`;
                    }

                    // Create the JS version of it
                    let bg = new OPERATOR(
                        this.Scope // Pass current scope
                    );

                    // Evaluate each argument
                    DATA = []; // Stores the results

                    // Get the array of args from the token
                    TOKEN = Operation._Tokens[i]._Tokens;
                    let evalres; // Evaluation result
                    for (let i = 0; i < TOKEN.length; i++) {
                        evalres = new CheddarEval(
                            { _Tokens:[TOKEN[i]] },
                            this.Scope
                        );
                        evalres = evalres.exec();
                        if (typeof evalres === "string") {
                            return evalres;
                        } else {
                            DATA.push(evalres);
                        }
                    }

                    // Construct the item
                    OPERATOR = bg.init(...DATA);

                    // If it's sucessful, set it to the calss
                    if (OPERATOR === true)
                        OPERATOR = bg;

                } else {
                    if (Operation._Tokens[i] === "[]") {
                        // it is [ ... ]
                        ++i; // Go to expression

                        // Execute the expression
                        let res = new CheddarEval(
                            { _Tokens: [ Operation._Tokens[i] ] },
                            this.Scope
                        ).exec();

                        // If response is a string, it's errored
                        if (typeof res === "string") {
                            return res;
                        }

                        // The response should be:
                        //  A) number
                        //  B) string

                        if (res.constructor.Name === "String" || (
                                res.constructor.Name === "Number" &&
                                Number.isInteger(res.value)
                            )) {
                            TARGET = res.value + "";
                        } else {
                            return `Evaluated accessors must evaluate to a string or integer`;
                        }

                    } else {
                        TARGET = Operation._Tokens[i]._Tokens[0];
                    }

                    // Else it is a property

                    // Attempt to access the accessor
                    // then use the accessor to get the token
                    if (!OPERATOR.accessor || !(DATA = OPERATOR.accessor(TARGET))) {
                        // ERROR INTEGRATE
                        return `${
                            NAME
                        } has no property ${
                            TARGET
                        }`;
                    }

                    // Set the previous item to the REFERENCE
                    REFERENCE = OPERATOR;

                    OPERATOR = to_value(DATA, REFERENCE, TARGET);

                    // Set the pending name to the target
                    NAME = TARGET;


                    if (typeof OPERATOR === "string")
                        return OPERATOR;
                }
            }

            this.put( OPERATOR );
        } else if (Operation.constructor.name === "CheddarExpressionTernary") {
            let condition = new CheddarExpressionToken();
            condition._Tokens = Operation._Tokens[0];
            let if_true = Operation._Tokens[1];
            let if_false = Operation._Tokens[2];

            condition = new CheddarEval(
                { _Tokens: [condition] },
                this.Scope
            ).exec();

            if (typeof condition === 'string')
                return condition;

            let condition_result = new (
                PRIMITIVE_LINKS.get("CheddarBooleanToken")
            )(this.Scope);

            let to_run = condition_result.init(condition) && condition_result.value === true ?
                if_true :
                if_false;

            to_run = new CheddarEval(
                { _Tokens: [ to_run ] },
                this.Scope
            ).exec();

            if (typeof to_run === 'string')
                return to_run;

            this.put(to_run);
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
