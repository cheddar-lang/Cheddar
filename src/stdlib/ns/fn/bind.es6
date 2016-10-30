export default function bind(cheddar) {
    return new cheddar.func(
        [
            ["args", {Splat: true}]
        ],
        function(scope, input){
            let args = input("args").value;
            if(args[0] instanceof cheddar.func){
                let f = args.shift();
                return new cheddar.func(
                    [["b", {Splat: true}]],
                    function(s, k){
                        return f.exec(k("b").value.concat(args), null);
                    }
                );
            } else if(args[args.length - 1] instanceof cheddar.func){
                let f = args.pop();
                return new cheddar.func(
                    [["b", {Splat: true}]],
                    function(s, k){
                        return f.exec(args.concat(k("b").value), null);
                    }
                );
            } else {
                return "Expected function as first or last argument.";
            }
        }
    );
}
