export default function(cheddar) {
    return cheddar.namespace([
        ["prompt", cheddar.var(require("./IO/prompt")(cheddar))],
        ["sprintf", cheddar.var(require("./IO/sprintf")(cheddar))]
    ]);
}