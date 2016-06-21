// Rational extension written by LegionMammal978

import CheddarError from '../../consts/err';

import CheddarBool from '../Bool';
import CheddarNumber from '../Number';
import CheddarRational from '../Rational';

import HelperInit from '../../../../helpers/init';

const add = (num1, den1, num2, den2) => {
    let gcd = CheddarRational.GCD(den1, den2);
    return HelperInit(CheddarRational, den2 / gcd * num1 + den1 / gcd * num2, den1 / gcd * den2);
};

const mul = (num1, den1, num2, den2) => {
    let gcd = CheddarRational.GCD(num1, den2) * CheddarRational.GCD(den1, num2);
    return HelperInit(CheddarRational, num1 * num2 / gcd, den1 * den2 / gcd);
};

export default new Map([
    ['+', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (LHS === null)
            return HelperInit(RHS.constructor, RHS.num, RHS.den);
        else if (RHS instanceof LHS.constructor)
            return add(LHS.num, LHS.den, RHS.num, RHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['-', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (LHS === null)
            return HelperInit(RHS.constructor, -RHS.num, RHS.den);
        else if (RHS instanceof LHS.constructor)
            return add(LHS.num, LHS.den, -RHS.num, RHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['*', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return mul(LHS.num, LHS.den, RHS.num, RHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['/', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (LHS === null)
            return HelperInit(RHS.constructor, RHS.den, RHS.num);
        else if (RHS instanceof LHS.constructor)
            return mul(LHS.num, LHS.den, RHS.den, RHS.num);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['^', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number") {
            if (RHS.value === ~~RHS.value) {
                if (RHS.value < 0)
                    return HelperInit(LHS.constructor, Math.pow(LHS.den, -RHS.value), Math.pow(LHS.num, -RHS.value));
                else
                    return HelperInit(LHS.constructor, Math.pow(LHS.num, RHS.value));
            }
            else
                return HelperInit(RHS.constructor, 10, 0, Math.pow(LHS.num / LHS.den, RHS.value));
        }
        else if (RHS instanceof LHS.constructor) {
            if (RHS.den === 1) {
                if (RHS.num < 0)
                    return HelperInit(LHS.constructor, Math.pow(LHS.den, -RHS.num), Math.pow(LHS.num, -RHS.num));
                else
                    return HelperInit(LHS.constructor, Math.pow(LHS.num, RHS.num));
            }
            else {
                let exp = LHS.constructor.Operator.get("^")(LHS, RHS.num);
                return HelperInit(CheddarNumber, 10, 0, Math.pow(exp.num / exp.den, 1 / RHS.den));
            }
        }
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['%', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor) {
            let gcd = CheddarRational.GCD(LHS.den, RHS.den);
            return HelperInit(LHS.constructor, (gcd * LHS.num / RHS.den) % (gcd * RHS.num / LHS.den), LHS.den / gcd * RHS.den);
        }
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['!', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(CheddarBool, RHS.num === 0);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['<', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.num * RHS.den < RHS.num * LHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['>', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.num * RHS.den > RHS.num * LHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['==', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.num === RHS.num && LHS.den == RHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['!=', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.num !== RHS.num || LHS.den !== RHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['<=', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.num * RHS.den <= RHS.num * LHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['>=', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarBool, LHS.num * RHS.den >= RHS.num * LHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['&', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, LHS.num & RHS.num, LHS.den & RHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['|', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (RHS instanceof LHS.constructor)
            return HelperInit(LHS.constructor, LHS.num | RHS.num, LHS.den | RHS.den);
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['sign', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (LHS === null)
            return HelperInit(CheddarNumber, 10, 0, Math.sign(RHS.num));
        else if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarNumber, 10, 0, Math.sign(LHS.constructor.Operator.get("-")(LHS, RHS)));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['sqrt', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, Math.sqrt(RHS.num / RHS.den));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['cbrt', (LHS, RHS) => {
        if (LHS === null)
            return HelperInit(RHS.constructor, 10, 0, Math.cbrt(RHS.num / RHS.den));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['root', (LHS, RHS) =>
        CheddarRational.Operator.get("^", LHS, CheddarRational.Operator.get("/")(null, RHS)],

    ['log', (LHS, RHS) => {
        if (RHS.constructor.Name === "Number")
            RHS = RHS.constructor.Cast.get("Rational")(RHS);
        if (LHS === null)
            return HelperInit(CheddarNumber, 10, 0, Math.log(RHS.num / RHS.den));
        else if (RHS instanceof LHS.constructor)
            return HelperInit(CheddarNumber, 10, 0, Math.log(LHS.num / LHS.den) / Math.log(RHS.num / RHS.den));
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    ['sin', (LHS, RHS) => LHS === null
        ? HelperInit(CheddarNumber, 10, 0, Math.sin(RHS.num / RHS.den))
        : CheddarError.NO_OP_BEHAVIOR],

    ['cos', (LHS, RHS) => LHS === null
        ? HelperInit(CheddarNumber, 10, 0, Math.cos(RHS.num / RHS.den))
        : CheddarError.NO_OP_BEHAVIOR],

    ['tan', (LHS, RHS) => LHS === null
        ? HelperInit(CheddarNumber, 10, 0, Math.tan(RHS.num / RHS.den))
        : CheddarError.NO_OP_BEHAVIOR],

    ['asin', (LHS, RHS) => LHS === null
        ? HelperInit(CheddarNumber, 10, 0, Math.asin(RHS.num / RHS.den))
        : CheddarError.NO_OP_BEHAVIOR],

    ['acos', (LHS, RHS) => LHS === null
        ? HelperInit(CheddarNumber, 10, 0, Math.acos(RHS.num / RHS.den))
        : CheddarError.NO_OP_BEHAVIOR],

    ['atan', (LHS, RHS) => LHS === null
        ? HelperInit(CheddarNumber, 10, 0, Math.atan(RHS.num / RHS.den))
        : CheddarError.NO_OP_BEHAVIOR],

    ['ceil', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, Math.ceil(RHS.num / RHS.den), 1)
        : CheddarError.NO_OP_BEHAVIOR],

    ['floor', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, Math.floor(RHS.num / RHS.den), 1)
        : CheddarError.NO_OP_BEHAVIOR],

    ['round', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, Math.round(RHS.num / RHS.den), 1)
        : CheddarError.NO_OP_BEHAVIOR],

    ['abs', (LHS, RHS) => LHS === null
        ? HelperInit(RHS.constructor, Math.abs(RHS.num), RHS.den)
        : CheddarError.NO_OP_BEHAVIOR],
]);
