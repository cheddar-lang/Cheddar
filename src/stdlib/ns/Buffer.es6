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
                cheddar.var(this.value[pointer] || new cheddar.nil) :
                false;
        })

        static Scope = new Map([
            ["create", cheddar.var(new cheddar.func([
                ["items", { Splat: true }]
            ], function(s, input) {
                let ar = input("items").value;
                let mem = new Uint32Array(ar.length);
                for (let i = 0; i < ar.length; i++) {
                    if (ar[i] instanceof cheddar.number) {
                        mem[i] = ar[i].value >> 0;
                    } else {
                        return `Item @${i} was expected to be 32-bit uint in buffer.`
                    }
                }
                let buf = new Buffer(mem);
                let res = new CBuffer();
                res.init(buf);
                return res;
            }))]
        ])
    }

    return _ = CBuffer;
}