// modular library written by Conor O'Bruie

import _Modular from "./modular/helpers/ModularClass";

export default function(cheddar){
    let Modular = _Modular(cheddar);
    class ModularSystem extends cheddar.class {
        static Name = "ModularSystem";

        init(min, max){
            let res = new Modular(null);
            res.init(min, max);
            return res;
        }
    }

    return ModularSystem;
    return cheddar.namespace([
        ["of", cheddar.from(require("./modular/of"))]
    ]);
}
