import HelperInit from '../../../../helpers/init';

export default new Map([
    ['!', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(RHS.constructor, !RHS.value);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }]
]);
