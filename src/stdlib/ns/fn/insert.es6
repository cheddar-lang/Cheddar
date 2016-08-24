export default function insert(cheddar) {
    return new cheddar.func(
        [
            ["f", { Type: cheddar.func }],
        ],
        function(scope, input){
            return new cheddar.func(
                [["array", {
                    Type: cheddar.array
                }]],
                function(s, k){
                    let arr = k("array");
                    let f = input("f");

                    if(arr.length === 1)
                        return arr;

                    // console.log("DEBUG:",arr);

                    return arr.value.reduce((prev, cur) => f.exec([prev, cur], null));
                }
            )
        }
    );
}
