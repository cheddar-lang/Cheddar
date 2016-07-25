export default function curry(cheddar) {
    return new cheddar.func(
        [
            ["f", {}],
            ["a", {}]
        ],
        function(scope, input){
            return new cheddar.func(
                [["b", {}]],
                function(s, k){
                    let f = input("f");
                    let a = input("a");
                    let b = k("b");
                    return f.exec([a, b], null);
                }
            )
        }
    );
}
