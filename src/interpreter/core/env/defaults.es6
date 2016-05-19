// Request dependencies for
//  preset casing for operator
//  handling
import CheddarString from '../primitives/String';
import CheddarError from '../consts/err';
import HelperInit from '../../../helpers/init';

export const DEFAULT_OP = new Map([

    // print: Definition
    ['print', (_, LHS) => {
        // Attempt to call `repr`, else, cast to string
        LHS = LHS.constructor.Operator.has('repr')
            ? LHS.constructor.Operator.get('repr')(LHS)
            : LHS.constructor.Cast.has('String')
            ? LHS.constructor.Cast.get('String')(LHS)
            : LHS;

        if (LHS instanceof CheddarString)
            console.log(LHS.value);
        else
            return CheddarError.NO_UNARY_BEHAVIOR;
        return LHS;
    }],

    ['repr', (_, LHS) => {
        // this thing's syntax is due to change
        return HelperInit(CheddarString, `${LHS.Name || "nil"}:()`);
    }]

]);


export const DEFAULT_CAST = new Map();