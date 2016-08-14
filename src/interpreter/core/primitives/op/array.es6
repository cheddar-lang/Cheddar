import CheddarError from '../../consts/err';
import CheddarString from '../String';
import HelperInit from '../../../../helpers/init';

export default new Map([
    ['!', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        if (LHS === null)
            return HelperInit(CheddarBool, RHS.value.length === 0);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['+', (LHS, RHS) => {
        if (RHS instanceof LHS.constructor) {
            return HelperInit(LHS.constructor, ...LHS.value.concat(RHS.value));
        } else {
            return CheddarError.NO_OP_BEHAVIOR;
        }
    }],

    ['*', (LHS, RHS) => {
        let CheddarNumber = require("../Number");
        if (RHS instanceof CheddarNumber) {
            let ar = LHS.value;
            let res = [];
            let t = RHS.value;
            for (let i = 0; i < t; i++) {
                res.push(...ar);
            }
            return HelperInit(LHS.constructor, ...res);
        } else {
            return CheddarError.NO_OP_BEHAVIOR;
        }
    }],

    ['has', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        let self = LHS.value;
        let op, res = HelperInit(CheddarBool, false);

        for (let i = 0; i < self.length; i++) {
            if (self[i] && self[i].Operator &&
                (op = self[i].Operator.get('=='))) {
                res = op(self[i], RHS);
                if (!(res instanceof CheddarBool)) {
                    return `\`has\` cannot compare item @${i}`;
                }
                else if (res.value === true) {
                    break;
                }
            }
            else {
                return `\`has\` cannot compare item @${i}`;
            }
        }

        return res;
    }],

    ['@"', (LHS, RHS) => {
        let CheddarArray = require("../Array");
        if(LHS === null)
            return HelperInit(CheddarString,
                RHS.value.map(x => String.fromCharCode(x.value)).join(""));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }]
]);
