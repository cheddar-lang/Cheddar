export default function(cheddar){
    return cheddar.namespace([
        ["hook", cheddar.from(require("./fn/hook"))],
        ["fork", cheddar.from(require("./fn/fork"))],
        ["reflexive", cheddar.from(require("./fn/reflexive"))],
        ["rflx", cheddar.from(require("./fn/reflexive"))],
        ["insert", cheddar.from(require("./fn/insert"))],
        ["prefixes", cheddar.from(require("./fn/prefixes"))]
    ]);
}
