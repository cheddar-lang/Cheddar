const ANY_CHAR = /([\uD800-\uDBFF][\uDC00-\uDFFF])|[\S\s]/g;
export default (api) => ["grid", api.prop(new api.func([],
    function(_, input) {
        return api.init(api.array, ...(
            input("self").value.split(/\r?\n|\r/)
        ).map(line => api.init(api.array, ...line.match(ANY_CHAR).map(
            chr => api.init(api.string, chr)
        ))));
    }
))];
