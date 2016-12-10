export default (api) => ["bytes", api.prop(new api.func([],
    function(_, input) {
        return api.init(api.array, ...(input("self").value.split("").map(
            chr => api.init(api.number, 10, 0, chr.charCodeAt())
        )));
    }
))];
