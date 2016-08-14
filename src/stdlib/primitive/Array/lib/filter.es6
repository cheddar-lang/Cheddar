export default (api) => ["filter", api.var(new api.func(
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
        let out = [];

        for (var i = 0; i < self.length; i++) {
            res = callback.exec([
                self[i],
                api.init(api.number, 10, 0, i),
                _self
            ]);

            if (typeof res === 'string') {
                return res;
            }

            if (!(res instanceof api.bool)) {
                res = api.init(api.bool, res);
            }

            if (res.value === true) {
                out.push(self[i]);
            }
        }

        return api.init(api.array, ...out);
    }
))];