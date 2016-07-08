export default (api) => ["turn", api.var(new api.func(
    [
        ["rotations", {
            Type: api.number,
            Default: api.init(api.number, 10, 0, 1)
        }]
    ],
    function(scope, input) {
        let self = input("self").value;
        let rotations = input("rotations").value % 4;

        if (rotations < 0) {
            rotations = 4 + rotations;
        }

        while (rotations--) {
            // Transpose self
            if (self[0] && self[0].value && self[0].value.length === undefined) {
                return "Second dimension must be iterable";
            }

            var w = self.length,
                h = self[0].value.length;

            var t = [], y;

            // Loop through every item in the outer array (height)
            for (var i = 0; i < h; i++) {
                // Insert a new row (array)

                // If it's an array
                if (self[i] instanceof api.array) {
                    y = 0;
                    t.push(api.init(api.array));
                } else {
                    y = 1;
                    t.push(api.init(api.string, ""));
                }
                // Loop through every item per item in outer array (width)
                for (var j = 0; j < w; j++) {
                    // Save transposed data.
                    if (y === 1) {
                        t[i].value = self[j].value[i] + t[i].value;
                    } else {
                        t[i].value.unshift( self[j].value[i] );
                    }
                }
            }

            self = t;
        }

        return api.init(api.array, ...t);
    }
))];