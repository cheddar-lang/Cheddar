import XRegExp from 'xregexp';

export default (api) => ["matches", api.var(new api.func(
    [
        ["regex", {
            Type: api.regex
        }]
    ],
    function(scope, input) {
        return api.init(
            api.array,
            ...[].concat(
                XRegExp.match(
                    input("self").value,
                    input("regex").value
                )
            ).map(str => api.init(api.string, str))
        );
    }
))]
