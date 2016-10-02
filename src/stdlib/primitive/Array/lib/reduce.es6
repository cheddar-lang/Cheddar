export default (api) => ["reduce", api.var(new api.func(
    [
        ["callback", {
            Type: api.func
        }]
    ],
    function(scope, input) {
        let self = input("self");
        let callback = input("callback");

        let res;

        try {
            return self.value.reduce(function(item1, item2, index, array) {
                res = input("callback").exec([item1, item2, api.init(api.number, 10, 0, index), self], null);

                if (typeof res === 'string')
                    throw res;

                return res;
            });
        } catch (e) {
            return e;
        }
    }
))];
