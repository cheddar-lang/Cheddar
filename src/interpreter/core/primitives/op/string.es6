import CheddarError from '../../consts/err';

import CheddarNumber from '../Number';
import HelperInit from '../../../../helpers/init';

import sprintf from '../../../../stdlib/ns/Console/sprintf';
// == STRING ==
export default new Map([
    // String concatenation
    //  using +, attempt to
    //  implicitly cast
    ['+', (LHS, RHS) => {

        if (LHS && RHS instanceof LHS.constructor)
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

    // Comparisons
    //  compares the char
    //  codes of the strings
    ['<', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value < RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['>', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value > RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['%', (LHS, RHS) => {
        let API = require('../../../../stdlib/api');
        return sprintf(API).exec(
            [LHS, RHS],
            null
        );
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
            if (RHS.value < 0)
                return HelperInit(LHS.constructor, "");
            else
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
