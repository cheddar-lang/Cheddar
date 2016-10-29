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
                Default: cheddar.init(cheddar.number, 10, 0, 1)
            }]
        ], function (scope, input) {
            let n = input("n").value;
            return cheddar.init(cheddar.number, 10, 0, fib(n));
        }
    )
}
