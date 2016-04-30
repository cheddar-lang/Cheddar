import {CAST_FAILED} from '../../consts/err';

import CheddarString from '../String';
import CheddarNumber from '../Number';

import HelperInit from '../../../../helpers/init';

export default new Map([
    [CheddarString, (RHS) =>
        RHS.value === "true" || (RHS.value !== "false" && CAST_FAILED)
    ],
    [CheddarNumber, (RHS) => HelperInit(CheddarNumber, 10, 0, +RHS.value)]
]);