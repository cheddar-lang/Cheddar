// Rational extension written by LegionMammal978

import CheddarArray from '../Array';
import CheddarBool from '../Bool';
import CheddarNumber from '../Number';
import CheddarString from '../String';

import HelperInit from '../../../../helpers/init';

export default new Map([
    ['Array', (LHS) => HelperInit(CheddarArray, LHS.num, LHS.den)],
    ['Boolean', (LHS) => HelperInit(CheddarBool, LHS.num)],
    ['Number', (LHS) => HelperInit(CheddarNumber, LHS.num / LHS.den)],
    ['String', (LHS) => HelperInit(CheddarString, LHS.num + ' / ' + LHS.den)]
]);
