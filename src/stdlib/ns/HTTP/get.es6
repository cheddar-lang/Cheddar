export default function factor(cheddar) {
    return new cheddar.func(
        [
            ["URL", {
                Type: cheddar.string,
            }]
        ],
        function(scope, input) {
            let URL = input("URL");
        }
    );
}
