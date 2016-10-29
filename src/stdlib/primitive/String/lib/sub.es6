import XRegExp from 'xregexp';
export default (cheddar) => ["sub", cheddar.var(new cheddar.func(
    [
        ['regex', {
            // Type: cheddar.(string|regex)
        }],

        ['replacement', {
            // Type: cheddar.(string|function)
        }]
    ],
    function(scope, input) {
        let string = input('self').value;
        let regex = input('regex');
        let replacement = input('replacement');

        if (regex instanceof cheddar.string || regex instanceof cheddar.regex) {
            regex = regex.value;
        } else {
            return `Pattern was of type ${
                regex.Name ||
                regex.constructor.Name
            }, expected string or regex`;
        }

        // Make sure replacement is string or funcion
        if (replacement instanceof cheddar.func) {
            // Given replacement
            let _replacement = replacement;

            // If it's a function create a wrapper
            replacement = function(...args) {
                // Check if args[0] is an object
                if (typeof args[0] === 'object') {
                    // TODO: Handle this
                }

                // Cast to cheddar strings
                let cargs = args.map(i => cheddar.init(cheddar.string, i));

                let res = _replacement.exec(cargs, null);
                if (!(res instanceof cheddar.string)) {
                    throw res.Name || res.constructor.Name; // Generall error
                } else {
                    return res.value;
                }
            };
        } else if (replacement instanceof cheddar.string) {
            replacement = replacement.value;
        } else {
            return `Replacement was of type ${
                replacement.Name ||
                replacement.constructor.Name
            }, expected string or function`;
        }

        let res;

        try {
            res = XRegExp.replace(string, regex, replacement);
        } catch(e) {
            return `Replacement returned ${e.message}, expected string.`;
        }

        return cheddar.init(cheddar.string, res);
    }
))];
