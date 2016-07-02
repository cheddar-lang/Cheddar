import CheddarError from '../../consts/err';
import HelperInit from '../../../../helpers/init';

export default new Map([
    ['!', (LHS, RHS) => {
        let CheddarBool = require('../Bool');
        if (LHS === null)
            return HelperInit(CheddarBool, RHS.value.length === 0);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }]
]);