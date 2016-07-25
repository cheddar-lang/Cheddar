export default function repeat(cheddar) {
    return new cheddar.func(
        [
            ["f", {}],
            ["n", {}]
        ],
        function(scope, input){
            return new cheddar.func(
                [["args", { Splat: true }]],
                function(s, k){
                    let f = input("f");
                    let n = input("n").value;
                    let args = k("args");
                    if(n === 0)
                        return args;
                    
                    args = args.value;
                    let res = f.exec(args, null);
                    while(--n > 0){
                        res = f.exec([res], null);
                    }
                    return res;
                }
            )
        }
    );
}
