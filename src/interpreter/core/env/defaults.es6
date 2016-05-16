// Request dependencies for
//  preset casing for operator
//  handling
import CheddarString from '../primitives/String';
import CheddarError from '../consts/err';

export const DEFAULT_OP = new Map([

    // print: Definition
    ['print', (_, LHS) => {
        // Attempt to cast to string
        LHS = LHS.constructor.Cast.has('String')
            ? LHS.constructor.Cast.get('String')(LHS)
            : LHS;

        if (LHS instanceof CheddarString)
            console.log(LHS.value);
        else
            return CheddarError.NO_UNARY_BEHAVIOR;
        return LHS;
    }]

]);


export const DEFAULT_CAST = new Map();