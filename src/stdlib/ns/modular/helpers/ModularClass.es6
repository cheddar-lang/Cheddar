let importInstance;
export default function(cheddar){
    if(importInstance) return importInstance;

    return importInstance = class ModularSystem extends cheddar.class {
        init(min, max){
            this.setter("min", cheddar.var(min));
            this.accessor("min");
            this.setter("max", cheddar.var(max));
            this.accessor("max");
        }

        // MUST be capitalized, otherwise bork
        Scope = new Map([
            ["fit", cheddar.var(
                new cheddar.func([
                    ["entry", { type: cheddar.number }]
                ], function(scope, input){
                    let self = input("self"),
                        value = input("entry").value,
                        min = self.accessor("min").Value.value,
                        max = self.accessor("max").Value.value;

                    while(value < min) value += max;
                    while(value >= max) value -= max;

                    return cheddar.init(cheddar.number, 10, 0, value);
                })
            )]
        ]);
    }

    return ModularSystem;
};
