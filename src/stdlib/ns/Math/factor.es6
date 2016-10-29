import _factor from "./helpers/factor";

export default function factor(cheddar) {
    return new cheddar.func(
        [
            ["n", {
                Type: cheddar.number,
            }]
        ],
        function(scope, input) {
            let out = cheddar.init(cheddar.array);

            let n = input("n").value;

            if (n === 0) {
                out.value.push(
                    cheddar.init(
                        cheddar.number,
                        10, 0, 0
                    )
                )
                return out;
            }

            for (let i = 1; i <= n; i++) {
                if (n % i == 0) {
                    out.value.push(
                        cheddar.init(
                            cheddar.number,
                            10, 0, i
                        )
                    );
                }
            }

            return out;
        }
    );
}
