export default (api) => ["replace", api.var(new api.func(
    [
        ["regex", {
            // Type: api.regex  // TODO: implement these
        }],
        ["replacement", {}]
    ],
    function(scope, input) {
        let regex = input("regex").value;
        if(typeof regex === "string") {
            regex = new RegExp(regex.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g");
        }
        return api.init(api.string, input("self").value.replace(
            regex,
            input("replacement").value
        ));
    }
))]
