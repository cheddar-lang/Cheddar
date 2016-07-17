export default function(cheddar) {
    let primitive = require('./primitive')(cheddar);

    return new cheddar.func([
        ["json", {
            Type: cheddar.string
        }]
    ], function(scope, input) {
        try {
            let res = new primitive(null);
            res.init(JSON.parse(input("json").value));
            return res;
        } catch(e) {
            return `Error parsing JSON`;
        }
    });
}