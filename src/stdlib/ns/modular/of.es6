import Modular from "./helpers/ModularClass";

export default function(cheddar){
    return new cheddar.func(
        [
            ["min", { type: cheddar.number }],
            ["max", { type: cheddar.number }]
        ],
        function(scope, input){
            return new (Modular(cheddar))(
                input("min"),
                input("max")
            );
        }
    );
}
