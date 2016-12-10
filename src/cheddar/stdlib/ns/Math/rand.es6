export default function(cheddar) {
    return new cheddar.func(
        [
            ["lower", {
                Type: cheddar.number,
                Optional: true
            }],
            ["upper", {
                Type: cheddar.number,
                Optional: true
            }],
        ], function(scope, input) {
            let lower = input("lower").value;
            let upper = input("upper").value;

            if (lower !== undefined) {
                if (upper === undefined) {
                    return cheddar.init(cheddar.number, 10, 0, Math.floor(
                        Math.random() * lower
                    ));
                } else {
                    return cheddar.init(cheddar.number, 10, 0, Math.floor(
                        Math.random() * (upper - lower) + lower
                    ));
                }
            } else {
                return cheddar.init(cheddar.number, 10, 0, Math.random());
            }

        }
    );
}
