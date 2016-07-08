// Rational extension written by LegionMammal978

import of from './helpers/of';
import GCD from './helpers/gcd';

export default function(cheddar, CheddarRational) {
    return new cheddar.func(
        [
            ["lhs", {}],
            ["rhs", {
                Optional: true
            }]
        ],
        function(scope, input) {
            let lhs, rhs;
            if (input("self") instanceof CheddarRational)
                [lhs, rhs] = [input("self"), input("lhs")];
            else if (input("rhs").constructor.Name === "nil")
                return "Rational.mod expects 2 arguments";
            else
                [lhs, rhs] = [of(input("lhs"), cheddar, CheddarRational),
                    input("rhs")];
            rhs = of(rhs, cheddar, CheddarRational);
            let gcd = GCD(lhs.den, rhs.den);
            return cheddar.init(CheddarRational, (gcd * lhs.num / rhs.den) %
                (gcd * rhs.num / lhs.den), lhs.den / gcd * rhs.den);
        }
    );
}
