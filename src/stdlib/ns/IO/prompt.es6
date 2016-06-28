const prompt = require('prompt-sync')();

export default function(cheddar) {
    return new cheddar.func(
        [
            ["prompt", {
                Type: cheddar.string
            }],
            ["required", {
                Type: cheddar.string,
                Optional: true
            }]
        ],
        function(scope, input) {
            let val = input("prompt").value;
            let retry = input("required");

            let res = prompt(val);

            if (retry instanceof cheddar.string) {
                // Keep trying to get input
                while (!res) {
                    res = prompt(retry.value);
                }
            }

            return cheddar.init(cheddar.string, res);
        }
    );
}