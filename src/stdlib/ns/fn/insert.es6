export default function reflexive(cheddar) {
    return new cheddar.func(
        [
            ["f", {}],
        ],
        function(scope, input){
            return new cheddar.func(
                [["array", {}]],
                function(s, k){
                    let arr = k("array");
                    let f = input("f");

                    if(arr.length === 1)
                        return arr;

                    return arr.value.reduce((prev, cur) => f.exec([prev, cur], null));
                }
            )
        }
    );
}
