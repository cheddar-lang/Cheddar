import _factor from "./helpers/factor";

export default function factor(cheddar){
    return new cheddar.func(
        [
            ["n", {
                Type: cheddar.number,
            }]
        ], function(scope, input){
            return _factor(input("n"));
        }
    );
}