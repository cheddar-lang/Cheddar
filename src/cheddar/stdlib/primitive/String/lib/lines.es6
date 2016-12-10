export default (api) => ["lines", api.prop(new api.func([],
    function(_, input) {
        return api.init(api.array, ...(
            input("self").value.split(/\r?\n|\r/)
        ).map(chr => api.init(api.string, chr)));
    }
))]
