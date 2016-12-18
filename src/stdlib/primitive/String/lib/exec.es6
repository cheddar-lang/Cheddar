import XRegExp from 'xregexp';

export default (api) => ["exec", api.var(new api.func(
    [
        ["regex", {
            Type: api.regex
        }]
    ],
    function(scope, input) {
        let res = XRegExp.exec(
            input("self").value,
            input("regex").value
        );

        if (res === null) res = [];

        let dict = api.init(api.dictionary);
        Object.keys(res).forEach(key => {
            if (key == "input" || key == "index") return;
            dict.value.set(key, api.init(api.string, res[key]));
        });

        return dict;
    }
))]
