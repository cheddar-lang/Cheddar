export default function insert(cheddar) {
    return new cheddar.func(
        [
            ["str", {
                Type: cheddar.string
            }],
        ],
        function(scope, input){
            let str = input("str");
        }
    );
}
