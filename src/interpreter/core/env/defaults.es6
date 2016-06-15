// Request dependencies for
//  preset casing for operator
//  handling
import CheddarError from '../consts/err';

import HelperInit from '../../../helpers/init';

export const DEFAULT_OP = new Map([

    // print: Definition
    ['print', (_, LHS) => {
        // Attempt to call `repr`, else, cast to string
        let VAL = LHS.constructor.Operator.has('repr')
                ? LHS.constructor.Operator.get('repr')(null, LHS)
                : LHS.constructor.Cast.has('String')
                ? LHS.constructor.Cast.get('String')(LHS)
                : LHS;

        if (VAL.constructor.Name === "String")
            console.log(VAL.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;

        return LHS;
    }],

    ['==', (LHS, RHS) => {
        return HelperInit(require("../primitives/Bool"), RHS && LHS instanceof RHS.constructor && LHS.value === RHS.value);
    }]

]);


export const DEFAULT_CAST = new Map();