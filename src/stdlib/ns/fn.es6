export default function(cheddar){
    return cheddar.namespace([
        ["hook", cheddar.from(require("./fn/hook"))],
        ["fork", cheddar.from(require("./fn/fork"))],
        ["reflexive", cheddar.from(require("./fn/reflexive"))],
        ["dbl", cheddar.from(require("./fn/dbl"))],
        ["pref", cheddar.from(require("./fn/pref"))],
        ["insert", cheddar.from(require("./fn/insert"))],
        ["prefix", cheddar.from(require("./fn/prefix"))],
        ["id", cheddar.from(require("./fn/id"))],
        ["curry", cheddar.from(require("./fn/curry"))],
        ["bind", cheddar.from(require("./fn/bind"))],
        ["rev", cheddar.from(require("./fn/rev"))],
        ["repeat", cheddar.from(require("./fn/repeat"))],
        ["of", cheddar.from(require("./fn/of"))]
    ]);
}
