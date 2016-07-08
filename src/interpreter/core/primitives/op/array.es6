import CheddarError from '../../consts/err';
import HelperInit from '../../../../helpers/init';

export default new Map([
    ['!', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        if (LHS === null)
            return HelperInit(CheddarBool, RHS.value.length === 0);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['has', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        let self = LHS.value;
        let op, res = HelperInit(CheddarBool, false);

        for (let i = 0; i < self.length; i++) {
            if (self[i] && self[i].constructor.Operator &&
                (op = self[i].constructor.Operator.get('=='))) {
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
    }]
]);