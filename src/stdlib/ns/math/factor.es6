import _factor from "./helpers/factor";

export default function factor(cheddar){
    return new cheddar.func(
        [
            ["n", {
                Type: cheddar.number,
            }]
        ], function(scope, done, input){
            done(_factor(input("n")));
        }
    );
}