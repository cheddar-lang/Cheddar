export default function prefix(cheddar) {
    return new cheddar.func(
        [["f", {}]],
        function(scope, k){
            return new cheddar.func(
                [["array", {}]],
                function(s, input){
                    let f = k("f");
                    return cheddar.init(cheddar.array, ...input("array").value.map(
                        (e, i, a) => f.exec(
                            cheddar.init(cheddar.array, ...a.slice(0, i + 1)),
                            null
                        )
                    ));
                }
            );
        }
    )
}
