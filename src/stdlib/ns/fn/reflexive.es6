export default function reflexive(cheddar) {
    return new cheddar.func(
        [
            ["f", {}],
        ],
        function(scope, input){
            return new cheddar.func(
                [["a", {}]],
                function(s, k){
                    let f = input("f");

                    return f.exec(Array(f.args.length).fill(k("a")), null);
                }
            )
        }
    );
}
