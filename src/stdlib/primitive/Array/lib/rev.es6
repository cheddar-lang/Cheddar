export default (api) => ["rev", api.prop(new api.func([],
    function(_, input) {
        return api.init(api.array, ...input("self").value.slice().reverse());
    }
))];
