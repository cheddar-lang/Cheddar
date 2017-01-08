export default function(cheddar) {
    return cheddar.namespace([
        ["E", cheddar.make(cheddar.number, 10, 0, 2.718281828459045)],
        ["PI", cheddar.make(cheddar.number, 10, 0, 3.141592653589793)],
        ["PHI", cheddar.make(cheddar.number, 10, 0, 1.618033988749894)],
        ["MILL", cheddar.make(cheddar.number, 10, 0, 1.306377883863080)],
        ["GAMMA", cheddar.make(cheddar.number, 10, 0, 0.577215664901532)],
        ["AVOGADRO", cheddar.make(cheddar.number, 10, 0, 6.02214086)],

        ["fib", cheddar.from(require("./Math/fib"))],
        ["factor", cheddar.from(require("./Math/factor"))],
        ["isPrime", cheddar.from(require("./Math/isPrime"))],
        ["primes", cheddar.from(require("./Math/primes"))],
        ["rand", cheddar.from(require("./Math/rand"))]
    ]);
}
