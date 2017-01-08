export default (api) => ["reverse", api.prop(new api.func([],
    function(_, input) {
        return api.init(api.string, (input("self").value.match(
            /([\uD800-\uDBFF][\uDC00-\uDFFF])|[\S\s]/g
        ) || []).reverse().join(""));
    }
))]
