export default function pref(cheddar) {
    return new cheddar.func(
        [
            ["array", {}],
        ],
        function(scope, input){
            return cheddar.init(cheddar.array, ...input("array").value.map(
                (e, i, a) => cheddar.init(cheddar.array, ...a.slice(0, i + 1))
            ));
        }
    );
}
