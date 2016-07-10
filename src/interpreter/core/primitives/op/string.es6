import CheddarError from '../../consts/err';

import CheddarNumber from '../Number';
import HelperInit from '../../../../helpers/init';

// == STRING ==
export default new Map([
    // Replace " with \"
    //  and replace \
    //  with \\s
    ['repr', (_, LHS) => {
        return HelperInit(LHS.constructor, '"' + LHS.value.replace(
            /"|\\/g, "\\$&"
        ) + '"');
    }],

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

    // Logical NOT
    //  if the string is
    //  empty
    ['!', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        if (LHS === null)
            return HelperInit(CheddarBool, RHS.value.length === 0);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // has operator
    //  checks if substring
    //  is empty
    ['has', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value.includes(RHS.value));
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
            return HelperInit(LHS.constructor, LHS.value.repeat(RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;

    }],


    ['@"', (LHS, RHS) => {
        let CheddarArray = require("../Array");
        if(LHS === null)
            return HelperInit(CheddarArray, ...[...RHS.value].map(x => HelperInit(CheddarNumber, 10, 0, x.charCodeAt())));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }]
]);