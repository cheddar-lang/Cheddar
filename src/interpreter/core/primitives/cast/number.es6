import CheddarString from '../String';
import HelperInit from '../../../../helpers/init';

export default new Map([
    ['String', (LHS) => HelperInit(CheddarString, LHS.value)]
]);