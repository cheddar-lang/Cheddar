export default (api) => ["lower", api.prop(new api.func([],
    function(_, input) {
        return api.init(api.string, input("self").value.toLowerCase());
    }
))]
