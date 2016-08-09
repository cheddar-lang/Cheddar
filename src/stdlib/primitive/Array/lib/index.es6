export default (api) => ["index", api.var(new api.func(
    [
        ["item", { }]
    ],
    function(scope, input) {
        let res = -1;
        let self = input("self").value;
        let item = input("item");

        let eq;

        for (let i = 0; i < self.length; i++) {
            if (self[i].Operator && (eq = self[i].Operator.get("==")) && eq(self[i], item).value === true) {
                res = i;
                break;
            }
        }

        return api.init(api.number, 10, 0, res)
    }
))]