// modular library written by Conor O'Bruie

export default function(cheddar){
    // let modular = new cheddar.func();
    // modular.scope = new Map([

    return cheddar.namespace([
        ["of", cheddar.from(require("./modular/of"))]
    ]);
}
