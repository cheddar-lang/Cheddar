import HelperInit from '../../../../helpers/init';

export default new Map([
    ['+', (LHS, RHS) => {
        RHS.value.forEach((k,v) => {
            LHS.value.set(k, v);
        });

        return LHS;
    }]
]);
