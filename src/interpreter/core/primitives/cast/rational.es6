// Rational extension written by LegionMammal978

import HelperInit from '../../../../helpers/init';

export default new Map([
    ['Array', (LHS) => HelperInit(require('../Array'), HelperInit(require('../Number'), 10, 0, LHS.num), HelperInit(require('../Number'), 10, 0, LHS.den))],
    ['Boolean', (LHS) => HelperInit(require('../Bool'), LHS.num)],
    ['Number', (LHS) => HelperInit(require('../Number'), 10, 0, LHS.num / LHS.den)],
    ['String', (LHS) => HelperInit(require('../String'), LHS.num + ' / ' + LHS.den)]
]);
