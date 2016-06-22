import CheddarRational from '../Rational';
import CheddarString from '../String';

import HelperInit from '../../../../helpers/init';

export default new Map([
    ['Rational', (LHS) => HelperInit(CheddarRational, LHS.value, 1)], // Rational extension written by LegionMammal978
    ['String', (LHS) => HelperInit(CheddarString, LHS.value)]
]);
