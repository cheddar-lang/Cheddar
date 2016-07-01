export default (api) => ["length", api.prop(new api.func([],
    function(_, input) {
        return input("self").value.length;
    }
))]