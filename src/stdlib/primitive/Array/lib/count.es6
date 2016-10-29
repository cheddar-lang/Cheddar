export default (api) => ["count", api.var(new api.func(
    [
        ["arg", {}]
    ],
    function(scope, input){
        let arg = input("arg");
        let self = input("self").value;
        if(arg.constructor.Name === "Function"){
            let amount = 0;
            for(let i = 0; i < self.length; i++){
                // todo: use cheddar definition of truth
                if(arg.exec([self[i], i, self], null).value){
                    amount++;
                }
            }
            return api.init(api.number, 10, 0, amount);
        } else {
            // todo: use cheddar's ==
            return "uhhh I cant do that, sorry.";
        }
    }
))];
