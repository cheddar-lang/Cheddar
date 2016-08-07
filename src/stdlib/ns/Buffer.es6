var _;
export default function(cheddar) {
    if (_) return _;

    class CBuffer extends cheddar.class {
        static Name = "Buffer";

        init(bytestream) {

            // If the buffer is not a buffer
            //  assume it is a Cheddar object
            //  therefore throw an error as a
            //  buffer cannot directly be
            //  created from a Cheddar Object
            if (!(bytestream instanceof Buffer)) {
                return "Cannot directly construct buffer, use `Buffer.create`";
            }

            this.value = bytestream;
        }

        accessor = cheddar.class.merge.accessor(function(pointer) {
            return Number.isInteger(+pointer) ?
                cheddar.var(this.value[
                    pointer < 0 ? this.value.length - pointer : pointer
                ] || new cheddar.nil) :
                false;
        })

        Cast = new Map([
            ["Array", (self) => {
                return cheddar.init(cheddar.array, ...[...self.value].map(i =>
                    cheddar.init(cheddar.number, 10, 0, i)
                ));
            }],

            ["String", (self) => {
                return cheddar.init(cheddar.string, [...self.value].map(i =>
                    String.fromCharCode(i)
                ).join(""));
            }]
        ])

        static Scope = new Map([
            ["create", cheddar.var(new cheddar.func([
                ["items", {}]
            ], function(s, input) {
                let items = input("items");
                let ar = items.value;
                let res = new CBuffer();
                if (items.constructor.Name === "Array") {
                    let mem = new Uint32Array(ar.length);
                    for (let i = 0; i < ar.length; i++) {
                        if (ar[i] instanceof cheddar.number) {
                            mem[i] = ar[i].value >> 0;
                        } else {
                            return `Item @${i} was expected to be 32-bit uint in buffer.`
                        }
                    }
                    let buf = new Buffer(mem);
                    res.init(buf);
                    return res;
                } else if (items.constructor.Name === "Number") {
                    let buf = new Buffer(new Uint32Array(ar));
                    res.init(buf);
                    return res;
                } else {
                    return `Invalid construction of Buffer`;
                }
            }))]
        ])
    }

    return _ = CBuffer;
}
