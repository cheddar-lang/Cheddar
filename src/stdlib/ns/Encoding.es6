export default function(cheddar) {
    return class Encoding extends cheddar.class {
        static Name = "Encoding";

        init(encode, decode) {
            this.Scope.setter("encode", cheddar.var(encode));
            this.Scope.setter("decode", cheddar.var(decode));
        }
    };
}