export default function fib(cheddar) {
    let memoized = new Map([[0, 0], [1, 1]]);  // memoize values for faster access

    let fib = (n) =>
        memoized.has(n) ?
            memoized.get(n)
            : n < 0 ?
                memoized.set(n, -fib(-n)).get(n)
                : memoized.set(n, fib(n - 1) + fib(n - 2)).get(n);

    return new cheddar.func(
        [
            ["n", {
                Type: cheddar.number,
                Default: cheddar.make(cheddar.number, 10, 0, 1)
            }]
        ], function (scope, done, input) {
            let n = input("n");
            // idk, write the functions specified in the csv?
            done(fib(n));
        }
    )
}