import * as CheddarError from '../../consts/err';

import CheddarString from '../String';
import CheddarBool from '../Bool';

import HelperInit from '../../../../helpers/init';

// from Cyoce the almighty platypus modified;
// http://chat.stackexchange.com/transcript/message/27392766#27392766
const range = (a, b) => {
    let CheddarNumber = require('../Number');
    if (a > b) return range(b, a).reverse();
    b = ~~b;
    var iPart = a - ~~a;
    a = ~~a;
    var out = Array(b - a + 1);
    while (b + iPart >= a) out[b - a] = HelperInit(CheddarNumber, 10, 0, b-- + iPart);
    if(iPart) out.pop();
    return out;
};

export default new Map([
    // Basic arithmetic operator
    //  definitions

    // Addition / (if enabled) implicit
    //  casting with concatenation
    ['+', (LHS, RHS) => {

        //NOTE: IMPLICIT
        //if (RHS.Cast.has(CheddarString))
        //    RHS = RHS.Cast.get(CheddarString)();

        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, RHS.value);
        else if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, LHS.value + RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // Subtraction, purely explicit
    //  with numbers.
    ['-', (LHS, RHS) => {

        //NOTE: IMPLICIT
        //if (RHS.Cast.has(CheddarString))
        //    RHS = RHS.Cast.get(CheddarString)();

        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, -RHS.value);
        else if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, LHS.value - RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // Multiplication either, arithemtic
    //  multiplication or repetition
    ['*', (LHS, RHS) => {

        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, LHS.value * RHS.value);
        else if (RHS.constructor.Name === "String")
            return HelperInit(RHS.constructor, RHS.value.repeat(LHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // Division, solely arithemtic
    ['/', (LHS, RHS) => {

        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, LHS.value / RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;

    }],

    ['^', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, Math.pow(LHS.value, RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['%', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, LHS.value % RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Boolean Operators ==
    ['!', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(CheddarBool, RHS.value === 0);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['<', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value < RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['>', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value > RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['==', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value === RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['!=', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value !== RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['<=', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value <= RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['>=', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.value >= RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Bitwise Operators ==
    ['&', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, LHS.value & RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['|', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, LHS.value | RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    [':', (LHS, RHS) => {
        let CheddarArray = require("../Array");
        if (LHS && RHS instanceof LHS.constructor)
            return HelperInit(CheddarArray, ...range(LHS.value, RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Word Operators ==
    ['sign', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, Math.sign(RHS.value));
        else if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, Math.sign(LHS.value - RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['sqrt', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, Math.sqrt(RHS.value));
        return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['cbrt', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, Math.cbrt(RHS.value));
        return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['root', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, Math.pow(LHS.value, 1 / RHS.value));
        return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['log', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, Math.log(RHS.value));
        else if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, 10, 0, Math.log(LHS.value) / Math.log(RHS.value));
        
        return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Trig Functions ==
    ['sin', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.sin(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['cos', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.cos(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['tan', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.tan(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['asin', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.asin(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['acos', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.acos(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['atan', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.atan(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],

    // == Rounding Functions ==
    ['ceil', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.ceil(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['floor', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.floor(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['round', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.round(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['abs', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.abs(RHS.value))
        : CheddarError.NO_OP_BEHAVIOR],

    // == Misc Operators ==
    ['len', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, 10, 0, Math.abs(Math.floor(RHS.value)))
        : CheddarError.NO_OP_BEHAVIOR],

    // == Assignment Operators

    // == Testing Operators ==
    ['@"', (LHS, RHS) => {
        if(LHS === null)    // monadic
            return HelperInit(CheddarString, String.fromCharCode(RHS.value));
        else if(RHS instanceof LHS.constructor)
            return HelperInit(CheddarString, range(LHS.value, RHS.value).map(e => String.fromCharCode(e)).join(""));
    }]
]);

/*
TODO:
'&', '|', // will do later
'+=', '-=', '*=', '/=', '^=', '%=', '&=', '|=', '<<', '>>', '<<=', '>>=',

'and', 'or', 'xor',
*/