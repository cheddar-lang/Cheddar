import NIL from '../consts/nil';
import CheddarFunction from '../env/func';
import CheddarError from '../consts/err';
import CheddarClass from '../env/class';
import CheddarErrorDesc from '../consts/err_msg';

export default function(isunary, operator, le, re) {
    let CheddarEval = require('../eval/eval');
    return new CheddarFunction([
        ["a", {
            Optional: isunary ? !!re : !!le && !!re
        }],
        ["b", {
            Optional: true
        }]
    ], function(scope, input) {
        let LHS = input("a"); // Used for unary if so
        let RHS = input("b");

        let leftexpression = le;
        let rightexpression = re;

        if (!leftexpression && !rightexpression) {
            // No default expressions
            leftexpression = LHS;
            rightexpression = isunary ? LHS : RHS;
        } else {
            // Otherwise evaluate the expressions which exist
            if (rightexpression) {
                let evaluator = new CheddarEval({ _Tokens: [ rightexpression ] }, scope.inheritanceChain).exec();
                if (typeof evaluator === "string")
                    return evaluator;
                rightexpression = evaluator;
            } else {
                rightexpression = leftexpression ? LHS : RHS;
                if (isunary) rightexpression = LHS;
            }

            if (leftexpression) {
                let evaluator = new CheddarEval({ _Tokens: [ leftexpression ] }, scope.inheritanceChain).exec();
                if (typeof evaluator === "string")
                    return evaluator;
                leftexpression = evaluator;
            } else {
                leftexpression = LHS;
            }
        }

        let op = (isunary ? rightexpression : leftexpression).Operator.get(operator);
        if (!op)
            op = CheddarError.NO_OP_BEHAVIOR;
        else if (isunary)
            op = op( null, rightexpression );
        else
            op = op( leftexpression, rightexpression )

        if (op === CheddarError.NO_OP_BEHAVIOR) {
            return CheddarErrorDesc.get(op)
                .replace(/\$0/g, operator)
                .replace(/\$1/g, leftexpression ? (
                    leftexpression.constructor.Name || (
                        leftexpression.prototype instanceof CheddarClass ?
                        "Class" :
                        "nil"
                    )
                ) : "nil")
                .replace(/\$2/g, rightexpression ? (
                    rightexpression.constructor.Name || (
                        rightexpression.prototype instanceof CheddarClass ?
                        "Class" :
                        "nil"
                    )
                ) : "nil");
        } else {
            return op;
        }
    });
}
