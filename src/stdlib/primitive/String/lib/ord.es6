export default (api) => ["ord", api.var(new api.func(
    [
        ["index", {
            Type: api.number,
            Default: api.init(api.number, 10, 0, 1)
        }]
    ],
    function(scope, input) {
        let self = input("self").value.match(
            // Matches a surrogate pair or a single character
            /([\uD800-\uDBFF][\uDC00-\uDFFF])|[\S\s]/g
        ) || [];
        let index = input("index").value;
        let target = self[index];
        let code;

        if (!target) {
            return api.init(api.nil);
        }

        if (target[1]) {
            code = 0x10000;
            code += (target.charCodeAt(0) & 0x03FF) << 10;
            code += (target.charCodeAt(1) & 0x03FF);
        } else {
            code = target.charCodeAt(0);
        }

        return api.init(api.number, 10, 0, code);
    }
))]