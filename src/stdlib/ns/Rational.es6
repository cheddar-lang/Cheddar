// Rational extension written by LegionMammal978

import GCD from './Rational/helpers/gcd';

export default function(cheddar) {
    class CheddarRational extends cheddar.class {
            static Name = "Rational";

            init(num, den) {
                if (num === 0 && den !== 0) {
                    this.num = 0;
                    this.den = 1;
                    return true;
                }
                [num, den] = [Math.sign(den) * num, Math.abs(den)];
                let gcd = GCD(num, den);
                this.num = ~~(num / gcd);
                this.den = ~~(den / gcd);
                if (this.den === 0)
                    return "AHHH DIVISION BY ZERO WE'RE ALL GONNA DIIIIIEEEEE";
                return true;
            }

            Cast = new Map([
                ["String", (val) => cheddar.init(cheddar.string, val.num + " / " + val.den)]
            ])
    };
    CheddarRational.Scope = CheddarRational.prototype.Scope = new Map([
        // Casts objects to rationals
        ["of", cheddar.from(require("./Rational/of"), CheddarRational)],
        // Casts rationals to numbers
        ["num", cheddar.from(require("./Rational/num"), CheddarRational)],
        // Addition
        ["add", cheddar.from(require("./Rational/add"), CheddarRational)],
        // Subtraction
        ["sub", cheddar.from(require("./Rational/sub"), CheddarRational)],
        // Negation
        ["neg", cheddar.from(require("./Rational/neg"), CheddarRational)],
        // Multiplication
        ["mul", cheddar.from(require("./Rational/mul"), CheddarRational)],
        // Division
        ["div", cheddar.from(require("./Rational/div"), CheddarRational)],
        // Multiplicative inversion (i.e., the reciprocal)
        ["inv", cheddar.from(require("./Rational/inv"), CheddarRational)],
        // Exponentiation
        ["pow", cheddar.from(require("./Rational/pow"), CheddarRational)],
        // Modulo operation
        ["mod", cheddar.from(require("./Rational/mod"), CheddarRational)],
        // Comparison
        ["cmp", cheddar.from(require("./Rational/cmp"), CheddarRational)],
        // Sign function
        ["sgn", cheddar.from(require("./Rational/sgn"), CheddarRational)],
        // Square root
        ["rsqrt", cheddar.from(require("./Rational/sqrt"), CheddarRational)],
        // Cube root
        ["rcbrt", cheddar.from(require("./Rational/cbrt"), CheddarRational)],
        // n'th root
        ["rroot", cheddar.from(require("./Rational/root"), CheddarRational)],
        // Natural exponential inversion (i.e., the natural logarithm)
        ["ln", cheddar.from(require("./Rational/ln"), CheddarRational)],
        // Generalized exponential inversion (i.e., other logarithms)
        ["rlog", cheddar.from(require("./Rational/log"), CheddarRational)],
        // Rounding towards +inf
        ["rceil", cheddar.from(require("./Rational/ceil"), CheddarRational)],
        // Rounding towards -inf
        ["rfloor", cheddar.from(require("./Rational/floor"), CheddarRational)],
        // Rounding half towards +inf
        ["rround", cheddar.from(require("./Rational/round"), CheddarRational)],
        // Absolute value function
        ["rabs", cheddar.from(require("./Rational/abs"), CheddarRational)]
    ]);

    return CheddarRational;
}
