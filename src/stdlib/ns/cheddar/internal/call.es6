export default function(cheddar) {
    let primitive = require('./primitive')(cheddar);
    let Interface = require('./interface')(cheddar);

    return new cheddar.func([
        ["item", {}]
    ], function(scope, input) {
        let func = input("item");
        if (func instanceof Interface) {
            return new cheddar.func([
                ["args", { Splat: true }]
            ], function(scope, input) {
                let val = input("args").value;
                for (let i = 0; i < val.length; i++) {
                    if (!(val[i] instanceof Interface)) {
                        return `Argument @${i} is not a primitive interface`;
                    } else {
                        val[i] = val[i].internal;
                    }
                }
                try {
                    let r = new primitive();
                    r.init(func.internal(...val));
                    return r;
                } catch(e) {
                    return `Error ${e.message}`;
                }
            });
        } else {
            return `Cannot call non-interface object \`${func.Name || func.constructor.Name || "object"}\``;
        }
    });
}
