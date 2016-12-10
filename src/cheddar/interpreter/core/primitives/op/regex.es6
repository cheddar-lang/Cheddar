import HelperInit from '../../../../helpers/init';
import XRegExp from 'xregexp';

export default new Map([
    ['|', (LHS, RHS) => {
        if (LHS && RHS instanceof LHS.constructor) {
            return HelperInit(LHS.constructor, XRegExp.union([LHS.value, RHS.value]));
        }
    }],

    ['+', (LHS, RHS) => {
        if (LHS && RHS instanceof LHS.constructor) {
            return HelperInit(LHS.constructor, XRegExp(LHS.value.xregexp.source + RHS.value.xregexp.source));
        }
    }],

    ['-', (LHS, RHS) => {
        if (LHS && RHS instanceof LHS.constructor) {
            return HelperInit(LHS.constructor, XRegExp(
                `(?!${RHS.value.xregexp.source})(?:${LHS.value.xregexp.source})`
            ));
        }
    }],

    ['*', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number") {
            return HelperInit(LHS.constructor, XRegExp(
                `(?:${LHS.value.xregexp.source}){${RHS.value|0}}`
            ));
        }
    }],
]);
