export default (api) => ["rect", api.var(new api.func(
    [
        ["fill", {
            Default: api.init(api.number, 10, 0, 0)
        }]
    ],
    function(scope, input) {
        let arr = input("self").value;
        // don't modify, since arr is of cheddar vals
        let fill = input("fill");
        let maxLen = 0;
        // width pad length
        for(let i = 0; i < arr.length; i++){
            maxLen = Math.max(arr[i].value.length, maxLen);
        }
        // pad each line
        arr = arr.map(line => {
            let k = line.value;
            while(k.length < maxLen)
                k.push(fill);

            // k contains cheddar vals
            return api.init(api.array, ...k);
        });
        return api.init(api.array, ...arr);
    }
))];
