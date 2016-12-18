export default (cheddar) => ["center", cheddar.var(new cheddar.func(
    [
        ["size", {
            Type: cheddar.number
        }],

        ["filler", {
            Type: cheddar.string,
            Default: cheddar.init(cheddar.string, " ")
        }]
    ],
    function(scope, input) {
        let self = input("self").value;
        let size = input("size").value;
        let filler = input("filler").value[0] || " ";

        let realSize = (size - self.length) / 2;

        return cheddar.init(cheddar.string, filler.repeat(realSize + 0.5 | 0) + self + filler.repeat(realSize | 0))
    }
))]
