// Rational extension written by LegionMammal978

import of from './helpers/of';
import pow from './helpers/pow';

export default function(cheddar, CheddarRational) {
    return new cheddar.func(
        [
            ["val", {
                Optional: true
            }]
        ],
        function(scope, input) {
            let val;
            if (input("self") instanceof CheddarRational)
                val = input("self");
            else if (input("val").constructor.Name === "nil")
                return "Rational.rcbrt expects 1 argument";
            else
                val = of(input("val"), cheddar, CheddarRational);
            return pow(val.num, val.den, 1, 3, cheddar, CheddarRational);
        }
    );
}
