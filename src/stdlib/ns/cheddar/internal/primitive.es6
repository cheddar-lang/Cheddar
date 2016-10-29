var v;
export default function(cheddar) {
    if (v) return v;
    v = class PrimitiveInterface extends (require('./interface')(cheddar)) {
        static Name = "PrimitiveInterface";
    };
    return v;
}
