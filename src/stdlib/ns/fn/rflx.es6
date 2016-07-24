export default function reflexive(cheddar) {
    return new cheddar.func(
        [
            ["f", {}],
        ],
        function(scope, input){
            return new cheddar.func(
                [["a", {
                    Splat: true
                }]],
                function(s, k){
                    let f = input("f");
                    let a = k("a");
                    let args = a.value.concat(a.value);
                    return f.exec(args, null);
                }
            )
        }
    );
}
