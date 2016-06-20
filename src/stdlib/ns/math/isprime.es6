import _factor from "./helpers/factor";

export default function isprime(cheddar) {
    return new cheddar.func(
        [
            ["n", {
                Type: cheddar.number,
            }]
        ], function(scope, done, input) {
            let n = input("n");
            done(_factor(n).length === 1);
        }
    );
}