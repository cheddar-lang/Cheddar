let importInstance;
export default function(cheddar){
    if(importInstance) return importInstance;

    return importInstance = class ModularSystem extends cheddar.class {
        init(min, max){
            this.setter("min", min);
            this.accessor("min");
            this.setter("max", max);
            this.accessor("max");
        }

        // MUST be capitalized, otherwise bork
        Scope = new Map([
            ["fit", cheddar.var(
                new cheddar.func([
                    ["entry", { type: cheddar.number }]
                ], function(scope, input){
                    let self = input("self"),
                        value = input("entry"),
                        min = self.accessor("min"),
                        max = self.accessor("max");

                    while(value < this.min) value += this.max;
                    while(value >= this.max) value -= this.max;
                    return value;
                })
            )]
        ]);
    }

    return ModularSystem;
};
