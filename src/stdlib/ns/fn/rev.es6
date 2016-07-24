export default function rev(cheddar) {
    return new cheddar.func(
        [
            ["f", {}]
        ],
        function(scope, input){
            return new cheddar.func(
                [["a", { Splat: true }]],
                function(s, k){
                    let a = k("a");
                    return input("f").exec(a.value.reverse(), null);
                }
            )
        }
    );
}
