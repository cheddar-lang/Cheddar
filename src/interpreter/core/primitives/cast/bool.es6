import {CAST_FAILED} from '../../consts/err';

import CheddarNumber from '../Number';
import CheddarString from '../String';
import HelperInit from '../../../../helpers/init';

export default new Map([
    ['String', (RHS) =>
        RHS.value === true ? HelperInit(CheddarString, "true")
        : RHS.value !== false
        ? CAST_FAILED
        : HelperInit(CheddarString, "false")
    ],
    ['Number', (RHS) => HelperInit(CheddarNumber, 10, 0, +RHS.value)]
]);