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
import CheddarOperatorToken from '../../../tokenizer/literals/op';
import CheddarTypedLiteral from '../../../tokenizer/parsers/typed';

// Call stack wrapper
import CheddarCallStack from './callstack';

// Standard Error class
import CheddarError from '../consts/err';

export default class CheddarEval extends CheddarCallStack {
    // To iterativaley evaluate the expression
    //  individual repeated steps would be taken
    //  which would also allow the debugger to
    //  function on the same foundation
    step() {
        const Operation = this.next();

        let OPERATOR,
            TOKEN;

        if (Operation instanceof CheddarOperatorToken) {
            TOKEN = this.shift();

            this.put(
                TOKEN.constructor.Operator.get(Operation.Tokens[0])(TOKEN,
                    Operation.Tokens[1] === OP_TYPE.UNARY
                        ? null
                        : this.shift()
                )
            );
        } else if (Operation instanceof CheddarTypedLiteral) {
            TOKEN = Operation.Tokens.pop();

            if (Operation.Tokens.length)
                /* TODO: Implement */;
            else
                if ((OPERATOR = PRIMITIVE_LINKS.get(TOKEN.constructor.name)))
                    this.put( new OPERATOR(...TOKEN.Tokens) );
                else
                    return CheddarError.UNLINKED_CLASS;
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
            if (!(step = this.step()))
                return step;
        return this.close();
    }
}