export default function(cheddar){
    return cheddar.namespace([
        ["hook", cheddar.from(require("./fn/hook"))],
        ["fork", cheddar.from(require("./fn/fork"))],
        ["reflexive", cheddar.from(require("./fn/reflexive"))],
        ["rflx", cheddar.from(require("./fn/rflx"))],
        ["pref", cheddar.from(require("./fn/pref"))],
        ["insert", cheddar.from(require("./fn/insert"))],
        ["prefix", cheddar.from(require("./fn/prefix"))],
        ["id", cheddar.from(require("./fn/id"))]
    ]);
}
