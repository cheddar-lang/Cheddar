import _factor from "./helpers/factor";

export default function isprime(cheddar) {
    return new cheddar.func(
        [
            ["n", {
                Type: cheddar.number,
            }]
        ], function(scope, input) {
            let n = input("n");
            return cheddar.init(cheddar.bool, _factor(n).length === 1);
        }
    );
}