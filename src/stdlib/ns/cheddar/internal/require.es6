export default function(cheddar) {
    let module = require('./module')(cheddar);

    return new cheddar.func([
        ["name", {
            Type: cheddar.string
        }]
    ], function(scope, input) {
        try {
            let res = new module();
            res.init(
                require(input("name").value)
            );
            return res;
        } catch(e) {
            return `Could not load module \`${input("name").value}\``;
        }
    });
}