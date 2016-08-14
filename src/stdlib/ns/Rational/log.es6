// Rational extension written by LegionMammal978

import of from './helpers/of';

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
                return "Rational.rlog expects 2 arguments";
            else
                [lhs, rhs] = [of(input("lhs"), cheddar, CheddarRational),
                    input("rhs")];
            rhs = of(rhs, cheddar, CheddarRational);
            let [num, den] = [Math.log(lhs.num) - Math.log(lhs.den),
                Math.log(rhs.num) - Math.log(rhs.den)];
            if (num === ~~num && den === ~~den)
                return cheddar.init(CheddarRational, num, den);
            return cheddar.init(cheddar.number, 10, 0, num / den);
        }
    );
}
