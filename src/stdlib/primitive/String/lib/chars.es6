export default (api) => ["chars", api.prop(new api.func([],
    function(_, input) {
        return api.init(api.array, ...(input("self").value.match(
            /([\uD800-\uDBFF][\uDC00-\uDFFF])|[\S\s]/g
        ) || []).map(chr => api.init(api.string, chr)));
    }
))]
