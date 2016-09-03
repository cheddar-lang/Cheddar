

import _Modular from "./helpers/ModularClass";

export default function(cheddar){
    let Modular = _Modular(cheddar);

    return new cheddar.func(
        [
            ["min", { type: cheddar.number }],
            ["max", { type: cheddar.number }]
        ],
        function(scope, input){
            let res = new Modular(null);
            res.init(
                input("min"),
                input("max")
            );
            return res;
        }
    );
}
