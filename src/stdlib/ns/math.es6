export default function(cheddar) {
    return new cheddar.scope(null, new Map([
        ["E", cheddar.make(cheddar.number, 10, 0, 2.718281828459045)],
        ["PI", cheddar.make(cheddar.number, 10, 0, 3.141592653589793)],
        ["PHI", cheddar.make(cheddar.number, 10, 0, 1.618033988749894)],
        ["MILL", cheddar.make(cheddar.number, 10, 0, 1.306377883863080)],
        ["GAMMA", cheddar.make(cheddar.number, 10, 0, 0.577215664901532)],
        ["AVOGADRO", cheddar.make(cheddar.number, 10, 0, 6.02214086)],

        ["fib", cheddar.var(require("./math/fib")(cheddar))],
        ["isprime", cheddar.var(require("./math/isprime")(cheddar))],
        ["nthprime", cheddar.var(require("./math/nthprime")(cheddar))]
        /**/
    ]));
}