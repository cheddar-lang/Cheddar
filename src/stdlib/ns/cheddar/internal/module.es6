export default function(cheddar) {
    return class ModuleInterface extends cheddar.class {
        static Name = "ModuleInterface";

        init(val) {
            this.internal = val;
            return true;
        }
    }
}