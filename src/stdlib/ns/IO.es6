export default function(cheddar) {
    return cheddar.namespace([
        ["prompt", cheddar.var(require("./IO/prompt")(cheddar))],
        ["printf", cheddar.var(require("./IO/printf")(cheddar))]
    ]);
}