// modular library written by Conor O'Bruie

import _Modular from "./modular/helpers/ModularClass";
import fit from "./modular/helpers/fit";
import sysEqual from "./modular/helpers/sysEqual";

export default function(cheddar){
    let Modular = _Modular(cheddar);
    class ModularSystem extends cheddar.class {
        static Name = "ModularSystem";

        init(min, max){
            // let res = new Modular(null);
            // res.init(min, max);
            // return res;
            this.setter("min", cheddar.var(min));
            this.accessor("min");
            this.setter("max", cheddar.var(max));
            this.accessor("max");

            return true;
        }

        Operator = new Map([
            ...cheddar.class.Operator,
            ["==", (LHS, RHS) => {
                sysEqual(LHS.value, RHS.value);
            }]
        ]);
        // MUST be capitalized, otherwise bork
        Scope = new Map([
            ["make", cheddar.var(
                new cheddar.func([
                    ["entry", { type: cheddar.number }]
                ], function(scope, input){
                    let self = input("self"),
                        value = input("entry").value,
                        min = self.accessor("min").Value.value,
                        max = self.accessor("max").Value.value;

                    let res = new Modular(null);
                    let fitted = value;//fit(min, max, value);
                    let cfit = cheddar.init(cheddar.number, 10, 0, fitted);
                    res.init(cfit, self);
                    return res;
                })
            )]
        ]);
    }

    return ModularSystem;
    // return cheddar.namespace([
    //     ["of", cheddar.from(require("./modular/of"))]
    // ]);
}
