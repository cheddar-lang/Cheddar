var v;
export default function(cheddar) {
    if (v) return v;
    v = class ModuleInterface extends cheddar.class {
        static Name = "ModuleInterface";

        init(val) {
            this.internal = val;
            return true;
        }
    }
    return v;
}