export default (api) => ["split", api.var(new api.func(
    [
        ["seperator", {
            Type: api.string
        }]
    ],
    function(scope, input) {
        return api.init(api.array, ...input("self").value.split(
            input("seperator").value
        ).map(l => api.init(api.string, l)));
    }
))]