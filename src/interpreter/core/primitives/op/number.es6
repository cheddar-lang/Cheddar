import * as CheddarError from '../../consts/err';

import CheddarString from '../String';
import CheddarArray from '../Array';

// from Cyoce the almighty platypus modified;
// http://chat.stackexchange.com/transcript/message/27392766#27392766
let range = (a, b) => {
    if (a > b) return range(b, a).reverse();
    b = ~~b;
    var iPart = a - ~~a;
    a = ~~a;
    var out = Array(b - a + 1);
    while (b + iPart >= a) out[b - a] = b-- + iPart;
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

        if (RHS === null)
            return new LHS.constructor(10, 0, LHS.value);
        else if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, LHS.value + RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // Subtraction, purely explicit
    //  with numbers.
    ['-', (LHS, RHS) => {

        //NOTE: IMPLICIT
        //if (RHS.Cast.has(CheddarString))
        //    RHS = RHS.Cast.get(CheddarString)();

        if (RHS === null)
            return new LHS.constructor(10, 0, -LHS.value);
        else if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, LHS.value - RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // Multiplication either, arithemtic
    //  multiplication or repetition
    ['*', (LHS, RHS) => {

        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, LHS.value * RHS.value);
        else if (RHS.constructor.Name === "String")
            return new(RHS.constructor)(RHS.value.repeat(LHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // Division, solely arithemtic
    ['/', (LHS, RHS) => {

        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, LHS.value / RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;

    }],

    ['^', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, Math.pow(LHS.value, RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['%', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, LHS % RHS);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Boolean Operators ==
    ['!', (LHS, RHS) => {
        if (RHS === null)
            return new LHS.constructor(10, 0, +(LHS.value === 0));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['<', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, +(LHS.value < RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['>', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, +(LHS.value > RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['=', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, +(LHS.value === RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['<=', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, +(LHS.value <= RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['>=', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, +(LHS.value >= RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Bitwise Operators ==
    ['&', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, LHS.value & RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['|', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, LHS.value | RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    [':', (LHS, RHS) => {
        if (RHS === null)
            return new CheddarArray(range(0, ~~LHS.value - Math.sign(~~LHS.value)));
        else if (RHS instanceof LHS.constructor)
            return new CheddarArray(range(LHS.value, RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Word Operators ==
    ['sign', (LHS, RHS) => {
        if (RHS === null)
            return new LHS.constructor(10, 0, Math.sign(LHS.value));
        else if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, Math.sign(LHS.value - RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['sqrt', (LHS, RHS) => {
        if (RHS === null)
            return new LHS.constructor(10, 0, Math.sqrt(LHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['cbrt', (LHS, RHS) => {
        if (RHS === null)
            return new LHS.constructor(10, 0, Math.cbrt(LHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['root', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, Math.pow(LHS.value, 1 / RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['log', (LHS, RHS) => {
        if(RHS instanceof LHS.constructor)
            return new LHS.constructor(10, 0, Math.log(LHS.value) / Math.log(RHS.value));
        if(RHS === null)
            return new LHS.constructor(10, 0, Math.log(LHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // == Trig Functions ==
    ['sin', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.sin(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['cos', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.cos(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['tan', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.tan(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],

    ['asin', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.asin(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['acos', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.acos(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['asin', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.atan(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],

    // == Rounding Functions ==
    ['ceil', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.ceil(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['floor', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.floor(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['round', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.round(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],
    ['abs', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.abs(LHS.value))
        : CheddarError.NO_OP_BEHAVIOR],

    // == Misc Operators ==
    ['len', (LHS, RHS) => RHS === null
        ? new LHS.constructor(10, 0, Math.abs(Math.floor(LHS.value)))
        : CheddarError.NO_OP_BEHAVIOR],

    // == Testing Operators ==
    ['@"', (LHS, RHS) => {
        if(RHS === null)    // monadic
            return new CheddarString(String.fromCharCode(LHS.value));
        else if(RHS instanceof LHS.constructor)
            return new CheddarString(range(RHS.value, LHS.value).map(e => String.fromCharCode(e)).join(""));
    }]
]);

/*
TODO:
'&', '|', // will do later
'!=', ':=', '+=', '-=', '*=', '/=', '^=', '%=', '&=', '|=', '<<', '>>', '<<=', '>>=',

'and', 'or', 'xor',
*/