// Request dependencies for
//  preset casing for operator
//  handling
import CheddarError from '../consts/err';
import HelperInit from '../../../helpers/init';

export const DEFAULT_OP = new Map([

    // print: Definition
    ['print', (_, LHS) => {
        if (!LHS || !LHS.Cast)
            return CheddarError.NO_OP_BEHAVIOR;

        // Attempt to call `repr`, else, cast to string
        let VAL = LHS.constructor.Name === 'String' ? LHS
                : LHS.Cast.has('String')
                ? LHS.Cast.get('String')(LHS)
                : LHS.Operator.has('repr')
                ? LHS.Operator.get('repr')(null, LHS)
                : LHS;


        // Stream
        if (VAL.constructor.Name === 'String')
            global.CHEDDAR_OPTS.PRINT(VAL.value + "\n");
        else
            return CheddarError.NO_OP_BEHAVIOR;

        return LHS;
    }],

    // + is no-op by default
    ['+', (_, self) => {
        if (_) return CheddarError.NO_OP_BEHAVIOR;

        // Destroy the references
        delete self.scope
        delete self.Reference
        return self;
    }],

    ['is', (LHS, RHS) => {
        let c = require('./class');
        if (LHS === null) {
            let f = require('./func');
            var comp = RHS.Operator.get('==');
            if (!comp) {
                return `\`${RHS.constructor.Name || RHS.Name || "object"}\` has no behavior for \`==\``;
            }
            var fn = new f([
                ["item", {}]
            ], function(scope, input) {
                return comp(RHS, input("item"));
            });

            fn.WHICH_CLASS = RHS instanceof c ? RHS.constructor : null;
            fn.SELF = RHS;
            return fn;
        } else {
            if (!(RHS.prototype instanceof c)) {
                return CheddarError.NO_OP_BEHAVIOR;
            }
            let b = require('../primitives/Bool');
            return HelperInit(b, LHS instanceof RHS);
        }
    }],

    ['actually', (LHS, RHS) => {
        let CheddarBool = require('../primitives/Bool');
        return HelperInit(CheddarBool, LHS && RHS.SELF ? LHS === RHS.SELF : CheddarError.NO_OP_BEHAVIOR);
    }],

    ['what', (LHS, RHS) => {
        return RHS.WHICH_CLASS || CheddarError.NO_OP_BEHAVIOR;
    }],

    ['::', (LHS, RHS) => {
        let CheddarClass = require('./class');
        let CAST_ALIAS = require('../config/alias');

        if (!(LHS.prototype instanceof CheddarClass)) {
            // ERROR INTEGRATE
            return 'Cast target must be class';
        }

        if (RHS.constructor === LHS)
            return RHS;

        let res;
        if ((res = RHS.Cast.get(LHS.Name) ||
                   RHS.Cast.get(LHS) ||
                   RHS.Cast.get(CAST_ALIAS.get(LHS)))) {
            return res(RHS);
        } else {
            return `Cannot cast to given target \`${LHS.Name || "object"}\``;
        }
    }],

    ['as', (LHS, RHS) => {
        var cast = RHS.Operator.get("::");
        return cast(RHS, LHS);
    }],

    ['==', (LHS, RHS) => {
        return HelperInit(
            require("../primitives/Bool"),
            RHS && LHS instanceof RHS.constructor && (LHS.value && (LHS.value === RHS.value))
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
        if (LHS === null && RHS && RHS.Cast && RHS.Cast.has('Bool'))
            return HelperInit(
                require("../primitives/Bool"),
                !RHS.Cast.get('Bool')(RHS).value
            );
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // TODO: short-circuiting
    ['&&', (LHS, RHS) => {
        let bool = require("../primitives/Bool");
        if (LHS && RHS)
            return HelperInit(
                bool,
                HelperInit(bool, LHS).value && HelperInit(bool, RHS).value
            );
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // TODO: short-circuiting
    ['||', (LHS, RHS) => {
        let bool = require("../primitives/Bool");
        if (LHS && RHS)
            return HelperInit(
                bool,
                HelperInit(bool, LHS).value || HelperInit(bool, RHS).value
            );
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

]);

export const DEFAULT_CAST = new Map([
    ['Bool', (self) => {
        let bool = require("../primitives/Bool");
        return HelperInit(bool, self);
    }]
]);
