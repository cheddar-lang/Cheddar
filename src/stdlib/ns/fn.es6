export default function(cheddar){
    return cheddar.namespace([
        ["hook", cheddar.from(require("./fn/hook"))],
        ["fork", cheddar.from(require("./fn/fork"))],
        ["reflexive", cheddar.from(require("./fn/reflexive"))]
    ]);
}
