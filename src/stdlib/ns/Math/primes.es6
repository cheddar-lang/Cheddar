export default function(cheddar) {
    return new cheddar.func(
        [
            ["n", {
                Type: cheddar.number,
            }],
            ["total", {
                Type: cheddar.bool,
                Default: cheddar.init(cheddar.bool, false)
            }]
        ], function(scope, input) {
            let n = input("n").value;
            let t = input("total").value;
            
            let f = bindings.primes.primesUnder;
            if (t) f = bindings.primes.generatePrimes;

            return cheddar.init(cheddar.array, ...f(n).map(i => cheddar.init(cheddar.number, 10, 0, i)));
        }
    );
}
