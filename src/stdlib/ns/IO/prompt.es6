const read = require('prompt-sync')({ sigint: true });

export default function(cheddar) {
    return new cheddar.func(
        [
            ["prompt", {
                Type: cheddar.string,
                Default: cheddar.init(cheddar.string, ""),
            }],
            ["required", {
                Type: cheddar.string,
                Optional: true
            }]
        ],
        function(scope, input) {
            let val = input("prompt").value;
            let retry = input("required");

            process.stdin.pause();
            let res = read(val);
            process.stdin.pause();

            if (retry instanceof cheddar.string) {
                // Keep trying to get input
                while (!res) {
                    res = read(retry);
                }
            }

            return cheddar.init(cheddar.string, res);
        }
    );
}