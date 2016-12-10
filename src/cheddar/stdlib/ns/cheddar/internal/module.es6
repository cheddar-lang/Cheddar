var v;
export default function(cheddar) {
    if (v) return v;
    v = class ModuleInterface extends require('./interface')(cheddar) {
        static Name = "ModuleInterface";
    }
    return v;
}
