// Rational extension written by LegionMammal978

import CheddarClass from '../env/class';

import BehaviorOperator from './op/rational';
import BehaviorCast from './cast/rational';

export default class CheddarRational extends CheddarClass {
    static Name = "Rational";

    init(num, den) {
        if (den == 0)
            return "No dividing by 0.";
        [this.num, this.den] = [num * Math.sign(den), Math.abs(den)];
        let red = CheddarRational.GCD(this.den, this.num);
        [this.num, this.den] = [~~(this.num / red), ~~(this.den / red)];
        return true;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;

}

CheddarRational.GCD = (a, b) => {
    while (b !== 0)
        [a, b] = [b, a % b];
    return a;
};
CheddarRational.Scope = require('../../../stdlib/primitive/Rational/static');
CheddarRational.prototype.Scope = require('../../../stdlib/primitive/Rational/lib');
