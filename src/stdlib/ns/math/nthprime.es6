import _factor from "./helpers/factor";

export default function nthprime(cheddar) {
    const getPrime = (n) => {
        if(n < 0 || typeof n !== "number") return `a positive number was expected, but actually received ${n}`;
        let gen = (function*(){
            let n = 0;
            while(true){
                while(_factor(n).length !== 1){
                    n++;
                }
                yield n++;
            }
        })();
        let v;
        while(n-- >= 0) v = gen.next();
        return v.value;
    };

    return new cheddar.func([
        ["n", {
            Type: cheddar.number,
        }]
    ], function(scope, done, input) {
        done(getPrime(input("n")));
    });
}