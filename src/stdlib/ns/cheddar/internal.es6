export default function(cheddar) {
    let uid = require('./uid')(cheddar).value;

    return new cheddar.func([
        ["uid", {
            Type: cheddar.string
        }]
    ], function(scope, input) {
        let v = input("uid").value;

        // Verify uid
        if (v !== uid) {
            return "Invalid uid token";
        }
        else {
            return cheddar.nstoclass(cheddar.namespace([
                ["require", cheddar.from(require('./internal/require'))],
                ["translate", cheddar.from(require('./internal/translate'))],
                ["json", cheddar.from(require('./internal/json'))],
                ["call", cheddar.from(require('./internal/call'))],
            ]));
        }
    });
}
