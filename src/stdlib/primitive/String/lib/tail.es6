export default (api) => ["tail", api.var(new api.func(
    [
        ["A", {
            Type: api.number
        }]
    ],
    function(scope, input) {
        let item = input("self").value;
        return api.init(api.string, item.slice(
            0,-Math.abs(input("A").value)
        ));
    }
))]
