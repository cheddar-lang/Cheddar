import * as CheddarError from '../../consts/err';

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

    ['..', (LHS, RHS) => {
        // from Cyoce the almighty platypus modified;
        // http://chat.stackexchange.com/transcript/message/27392766#27392766
        let range = (a, b) => {
            if (a > b) return range(b, a).reverse();
            var out = Array(b - a + 1);
            while (b >= a) out[b - a] = b--;
            return out;
        };

        if (RHS === null)
            return range(0, LHS.value - Math.sign(LHS.value));
        else if (RHS instanceof LHS.constructor)
            return range(RHS.value, LHS.value);
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
    }]
]);

/*
TODO:
'&', '|', // will do later
'!=', ':=', '+=', '-=', '*=', '/=', '^=', '%=', '&=', '|=', '<<', '>>', '<<=', '>>=',

'and', 'or', 'xor',

'sin', 'cos', 'tan',
'acos', 'asin', 'atan',
'log', 'log2', 'log10',
'floor', 'ceil', 'round',
'len'
*/