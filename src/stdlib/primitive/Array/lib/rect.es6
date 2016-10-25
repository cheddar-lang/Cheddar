export default (api) => ["rect", api.var(new api.func(
    [
        ["fill", {
            Default: api.init(api.number, 10, 0, 0)
        }]
    ],
    function(scope, input) {
        let arr = input("self").value;
        let fill = input("fill");
        let maxLen = 0;
        for(let i = 0; i < arr.length; i++){
            maxLen = Math.max(arr[i].value.length, maxLen);
        }
        arr = arr.map(line => {
            let k = line.value;
            while(k.length < maxLen)
                k.push(fill);

            return api.init(api.array, ...k);
        });
        return api.init(api.array, ...arr);
    }
))];
