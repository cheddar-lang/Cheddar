import sprintf from './sprintf';
export default function(cheddar) {
    return new cheddar.func(
        [
            ["format", {
                Type: cheddar.string
            }],
            ["args", {
                Splat: true
            }]
        ],
        function(scope, input) {
            let result = sprintf(cheddar).exec(
                [input("format"), ...input("args").value],
                input("self")
            );

            // Stream
            process.stdout.write(result.value);

            return result;
        }
    );
}