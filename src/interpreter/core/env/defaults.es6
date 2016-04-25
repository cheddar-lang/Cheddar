// Request dependencies for
//  preset casing for operator
//  handling
import CheddarString from '../primitives/String';
import CheddarError from '../consts/err';

export const DEFAULT_OP = new Map([

    // print: Definition
    ['print', (LHS) => {
        LHS = LHS.constructor.Cast.has(CheddarString)
            ? LHS.constructor.Cast.get(CheddarString)(LHS)
            : LHS;

        if (LHS instanceof CheddarString)
            // REVISE: Stream
            console.log(LHS.value)
        else
            return CheddarError.NO_UNARY_BEHAVIOR;
        return LHS;
    }]

]);


export const DEFAULT_CAST = new Map();