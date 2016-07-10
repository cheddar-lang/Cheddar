export default (api) => ["map", api.var(new api.func(
    [
        ["callback", {
            Type: api.func
        }]
    ],
    function(scope, input) {
        let callback = input("callback");
        let _self = input("self");
        let self = _self.value;
        let res;
        let out = api.init(api.array);

        for (var i = 0; i < self.length; i++) {
            res = callback.exec([
                self[i],
                api.init(api.number, 10, 0, i),
                _self
            ]);

            if (typeof res === 'string') {
                return res;
            } else {
                out.value.push(res || new api.nil);
            }
        }

        return out;
    }
))];