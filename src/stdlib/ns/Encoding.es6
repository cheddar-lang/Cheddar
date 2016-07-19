var _;
export default function(cheddar) {
    if (_) return _;

    class Encoding extends cheddar.class {
        static Name = "Encoding";

        init(encode, decode) {
            this.manage("encode", cheddar.var(encode));
            this.manage("decode", cheddar.var(decode));

            return true;
        }

        static Scope = new Map([
            ["UTF8", cheddar.var(require('./Encoding/UTF8')(cheddar, Encoding))]
        ])
    }

    return _ = Encoding;
}