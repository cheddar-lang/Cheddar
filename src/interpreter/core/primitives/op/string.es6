import CheddarError from '../../consts/err';

import CheddarNumber from '../Number';
import HelperInit from '../../../../helpers/init';

// == STRING ==
export default new Map([
    // String concatenation
    //  using +, attempt to
    //  implicitly cast
    ['+', (LHS, RHS) => {

        //NOTE: IMPLICIT
        //if (RHS.Cast.has(CheddarString))
        //    RHS = RHS.Cast.get(CheddarString)();

        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, LHS.value + RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // String repetition
    //  when either Operator<*>.Behavior
    //  is (String, Number)
    //  or (Number, String)
    //  repeat <String> <Number> times
    ['*', (LHS, RHS) => {

        if (RHS.constructor.Name === "Number")
            return HelperInit(this.constructor, LHS.value.repeat(RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;

    }],


    ['@"', (LHS, RHS) => {
        let CheddarArray = require("../Array");
        if(LHS === null)
            return new CheddarArray(...[...RHS.value].map(x => HelperInit(CheddarNumber, 10, 0, x.charCodeAt())));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }]
]);