import { UOP, OP } from "../../../tokenizer/consts/ops";
import fork from "./fork";

const ops = [
    "+", "*", "**", "-", "^",
    "&", "|", "/", "%", "@\""
];     // TODO: make dynamic

const parse = (str) => {
    let tokens = [];
    for(let i = 0; i < str.length; i++){
        if(!ops.some(x => x[0] === str[i])) continue;

        let build = "";
        while(ops.some(x => x.indexOf(build + str[i]) >= 0)){
            build += str[i++];
        }
        i--;
        tokens.push(build);
    }
    return tokens;
}

export default function insert(cheddar) {
    return new cheddar.func(
        [
            ["str", {
                Type: cheddar.string
            }],
        ],
        function(scope, input){
            let str = input("str");
            let toks = parse(str.value);
            if(toks.length !== 3){
                return "I haven't implemented this yet.";
            }
            return fork.exec(...toks.map(e =>
                new cheddar.func(
                    ["LHS", { }],
                    ["RHS", { Optional: true }],
                    function(_scope, _input){
                        let LHS = input("LHS");
                        let RHS = input("RHS");

                        return LHS.Operator.get(e)(RHS ? LHS : null, RHS || LHS);
                    }
                )
            ), null);
        }
    );
}
