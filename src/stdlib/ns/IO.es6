export default function(cheddar) {
    return cheddar.namespace([
        ["read", cheddar.var(require("./IO/read")(cheddar))],
        ["prompt", cheddar.var(require("./IO/prompt")(cheddar))],
        ["printf", cheddar.var(require("./IO/printf")(cheddar))],
        ["sprintf", cheddar.var(require("./IO/sprintf")(cheddar))],
        ["open", cheddar.var(require("./IO/open")(cheddar))],
        ["stdin", cheddar.var(require("./IO/stdin")(cheddar))],
        ["fd", cheddar.var(require("./IO/fd")(cheddar))],
        ["rm", cheddar.var(require("./IO/rm")(cheddar))],
        ["rmdir", cheddar.var(require("./IO/rmdir")(cheddar))],
        ["exec", cheddar.var(require("./IO/exec")(cheddar))],
    ]);
}
