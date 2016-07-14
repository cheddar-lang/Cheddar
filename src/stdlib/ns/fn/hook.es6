export default function hook(cheddar) {
    return new cheddar.func(
        [
            ["f", {}],
            ["g", {}]
        ],
        function(scope, input){
            return new cheddar.func(
                [["args", {Splat: true}]],
                function(s, k){
                    let args = k("args").value;

                    if(args.length > 2 || !args.length)
                        return `Expected 1 or 2 args, received ${args.length || "none"}`;


                    let [a, b] = args;
                    let f = input("f");
                    let g = input("g");

                    return f.exec(null, [a, g.exec(null, [args.length === 1 ? a : b])]);
                }
            )
        }
    );
}
