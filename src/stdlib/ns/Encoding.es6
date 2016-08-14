var _;
export default function(cheddar) {
    if (_) return _;

    class Encoding extends cheddar.class {
        static Name = "Encoding";

        init(encode, decode) {
            if (!(encode instanceof cheddar.func && decode instanceof cheddar.func)) {
                return `encoding and decoding must be functions`;
            }

            this.manage("encode", cheddar.var(encode));
            this.manage("decode", cheddar.var(decode));

            return true;
        }

        static Scope = new Map([
            ["UTF8", cheddar.var(require('./Encoding/UTF8')(cheddar, Encoding))],
            ["UTF16", cheddar.var(require('./Encoding/UTF16')(cheddar, Encoding))],
            ["ASCII", cheddar.var(require('./Encoding/ASCII')(cheddar, Encoding))],
            ["shoco", cheddar.var(require('./Encoding/shoco')(cheddar, Encoding))],
            ["base64", cheddar.var(require('./Encoding/base64')(cheddar, Encoding))],
        ])
    }

    return _ = Encoding;
}