import HelperInit from '../../../../helpers/init';
export default new Map([
    ['repr', (LHS, RHS) => {
        let CheddarString = require('../String');
        return HelperInit(CheddarString, `/${RHS.source}/${RHS.flags}`);
    }]
]);