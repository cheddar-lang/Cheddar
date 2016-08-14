export default (api) => ["join", api.var(new api.func(
    [
        ["seperator", {
            Type: api.string,
            Default: api.init(api.string, "")
        }]
    ],
    function(scope, input) {
        let self = input("self").value;
        let seperator = input("seperator").value;

        let stringified = "",
            cast, text;

        for (let i = 0; i < self.length; i++) {
            cast = (self[i] instanceof api.string) || self[i].Cast.get('String');

            if (cast) {
                if (cast === true) {
                    text = self[i].value;
                } else {
                    text = cast(self[i]).value;
                }
                stringified += (i ? seperator : "") + text;
            } else {
                return `Cannot stringify \`${
                    self[i].constructor.Name || self[i].Name
                }\` in join`;
            }
        }

        return api.init(api.string, stringified);
    }
))];