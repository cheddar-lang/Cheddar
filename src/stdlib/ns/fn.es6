export default function(cheddar){
    return cheddar.namespace([
        ["hook", cheddar.from(require("./fn/hook"))]
    ]);
}
