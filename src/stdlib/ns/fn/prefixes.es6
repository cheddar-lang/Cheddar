import { prefixes } from "common";

export default function prefixes(cheddar) {
    return new cheddar.func(
        [
            ["array", {}],
        ],
        function(scope, input){
            return cheddar.init(cheddar.array(...prefixes(array.value)));
        }
    );
}
    
