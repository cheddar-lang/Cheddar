var _;
export default function(cheddar) {
    if (_) return _;

    class Size extends cheddar.class {
        static Name = "Size";

        init(width, height) {
            if (!(width instanceof cheddar.number && height instanceof cheddar.number)) {
                // TODO: Replace with detailed errors
                return "Width and height paramters are not both numbers"
            }

            this.manage("width", cheddar.var(width));
            this.manage("height", cheddar.var(height));

            return true;
        }

        Cast = new Map([...cheddar.class.Cast,
            ["String", (self) =>
                cheddar.init(cheddar.string, self.accessor("width").Value.value + "x" + self.accessor("height").Value.value)
            ],
            ["Array", (self) =>
                cheddar.init(cheddar.array, self.accessor("width").Value, self.accessor("height").Value)
            ]
        ])

        static Scope = new Map([
        ])
    }

    return _ = Size;
}
