export default (api) => ["len", api.prop(new api.func([],
    function(_, input) {
        var size = (input("self").value.match(
            /([\uD800-\uDBFF][\uDC00-\uDFFF])|[\S\s]/g
        ) || []).length;
        return api.init(api.number, 10, 0, size);
    }
))]
