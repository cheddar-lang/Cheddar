export default function(cheddar) {
    return new cheddar.func(
        [
            ["output", {
                // TODO: Support buffer
                Type: cheddar.string
            }]
        ],
        function(scope, input) {
            global.CHEDDAR_OPTS.PRINT(input("output").value);
        }
    );
}
