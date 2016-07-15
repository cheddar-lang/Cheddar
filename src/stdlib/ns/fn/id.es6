export default function id(cheddar) {
    return new cheddar.func(
        [["a", {}]],
        function(scope, input){
            return input("a");
        }
    )
}
