export default function id(cheddar) {
    return new cheddar.func(
        [["a", { Type: cheddar.func }]],
        function(scope, input){
            return input("a");
        }
    )
}
