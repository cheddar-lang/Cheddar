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
            if (input("rhs").constructor.Name === "nil")
                return of(input("lhs"), cheddar, CheddarRational);
            return of(cheddar.init(cheddar.array, input("lhs"),
                input("rhs")), cheddar, CheddarRational);
        }
    );
}
