import XRegExp from 'xregexp';

export default (api) => ["test", api.var(new api.func(
    [
        ["regex", {
            Type: api.regex
        }]
    ],
    function(scope, input) {
        return api.init(api.bool, XRegExp.test(
            input("self").value,
            input("regex").value
        ));
    }
))]
