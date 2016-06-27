import HelperInit from '../../../../helpers/init';

export default new Map([
    ['Number', (RHS) => HelperInit(require('../Number'), +RHS.value)]
]);