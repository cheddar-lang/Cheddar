// reference: api.init(api.number, base, bitshift, value in base 10);
export default (api) => ["moore", api.var(new api.func(
    [
        ["x", { Type: api.number }],
        ["y", { Type: api.number }],
        ["n", { Type: api.number, Default: api.init(api.number, 10, 0, 1)}]
        // todo: add `m` argument, default `m = n`
    ],
    function(scope, input) {
        // array of arrays of cheddar values
        let self = input("self").value.map(e => e.value);
        let x = input("x").value;
        let y = input("y").value;
        let n = input("n").value;
        // let m = input("m").value;
        let m = n;

        let grid = [];
        for(let i = y - n; i <= y + n; i++){
            let row = [];
            if(typeof self[i] === "undefined") continue;
            for(let j = x - m; j <= x + m; j++){
                if(typeof self[i][j] === "undefined") continue;
                row.push(self[i][j]);
            }
            let chedRow = api.init(api.array, ...row)
            grid.push(chedRow);
        }
        let chedGrid = api.init(api.array, ...grid);
        return chedGrid;
    }
))]
