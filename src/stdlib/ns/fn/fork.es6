export default function fork(cheddar) {
    return new cheddar.func(
        [
            ["f", { Type: cheddar.func }],
            ["g", { Type: cheddar.func }],
            ["h", { Type: cheddar.func }]
        ],
        function(scope, input){
            return new cheddar.func(
                [["args", {Splat: true}]],
                function(s, k){
                    let args = k("args").value;

                    let f = input("f");
                    let g = input("g");
                    let h = input("h");

                    return g.exec([
                        f.exec(args, null),
                        h.exec(args, null)
                    ], null);
                }
            )
        }
    );
}
