export default (api) => ["index", api.var(new api.func(
    [
        ["substring", {
            Type: api.string
        }]
    ],
    function(scope, input) {
        return api.init(api.number, 10, 0, input("self").value.indexOf(input("substring").value));
    }
))]