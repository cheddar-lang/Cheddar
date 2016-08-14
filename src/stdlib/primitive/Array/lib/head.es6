export default (api) => ["head", api.var(new api.func(
    [
        ["A", {
            Type: api.number
        }]
    ],
    function(scope, input) {
        let item = input("self").value;
        return api.init(api.array, ...item.slice(
            0,
            input("A").value
        ));
    }
))]