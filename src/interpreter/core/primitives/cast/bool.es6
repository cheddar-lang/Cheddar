import {CAST_FAILED} from '../../consts/err';

import CheddarNumber from '../Number';
import HelperInit from '../../../../helpers/init';

export default new Map([
    ['String', (RHS) =>
        RHS.value === "true" || (RHS.value !== "false" && CAST_FAILED)
    ],
    ['Number', (RHS) => HelperInit(CheddarNumber, 10, 0, +RHS.value)]
]);