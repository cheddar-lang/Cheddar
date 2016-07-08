// Request dependencies for
//  preset casing for operator
//  handling
import CheddarError from '../consts/err';
import HelperInit from '../../../helpers/init';

export const IS_CLASS = Symbol("IS_CLASS");
export const DEFAULT_OP = new Map([

    // print: Definition
    ['print', (_, LHS) => {
        if (!LHS || !LHS.constructor.Cast)
            return CheddarError.NO_OP_BEHAVIOR;

        // Attempt to call `repr`, else, cast to string
        let VAL = LHS.constructor.Name === 'String' ? LHS
                : LHS.constructor.Cast.has('String')
                ? LHS.constructor.Cast.get('String')(LHS)
                : LHS.constructor.Operator.has('repr')
                ? LHS.constructor.Operator.get('repr')(null, LHS)
                : LHS;

        // Stream
        if (VAL.constructor.Name === 'String')
            console.log(VAL.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;

        return LHS;
    }],

    ['::', (LHS, RHS) => {
        let CheddarClass = require('./class');
        let CAST_ALIAS = require('../config/alias');

        if (!(LHS.prototype instanceof CheddarClass))
            return CheddarError.CAST_FAILED;

        let res;
        if ((res = RHS.constructor.Cast.get(LHS.Name) ||
                   RHS.constructor.Cast.get(LHS) ||
                   RHS.constructor.Cast.get(CAST_ALIAS.get(LHS)))) {
            return res(RHS);
        } else {
            return CheddarError.NO_OP_BEHAVIOR;
        }
    }],

    ['==', (LHS, RHS) => {
        return HelperInit(
            require("../primitives/Bool"),
            RHS && LHS instanceof RHS.constructor && LHS.value === RHS.value
        );
    }],

    ['!=', (LHS, RHS) => {
        return HelperInit(
            require("../primitives/Bool"),
            RHS && LHS instanceof RHS.constructor && LHS.value !== RHS.value
        );
    }],

    // Defaults
    ['!', (LHS, RHS) => {
        if (LHS === null && RHS && RHS.constructor.Cast && RHS.constructor.Cast.has('Bool'))
            return HelperInit(
                require("../primitives/Bool"),
                !RHS.constructor.Cast.get('Bool')(RHS).value
            );
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }]

]);

export const DEFAULT_CAST = new Map([
    ['Bool', (self) => {
        self
    }]
]);