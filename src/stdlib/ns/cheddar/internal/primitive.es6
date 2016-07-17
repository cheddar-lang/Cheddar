export default function(cheddar) {
    return class PrimitiveInterface extends cheddar.class {
        static Name = "PrimitiveInterface";

        init(val) {
            this.internal = val;
            return true;
        }
    }
}