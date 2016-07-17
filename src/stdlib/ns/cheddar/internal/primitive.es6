var v;
let toString = {}.toString;
export default function(cheddar) {
    if (v) return v;
    v = class PrimitiveInterface extends cheddar.class {
        static Name = "PrimitiveInterface";

        init(val) {
            this.internal = val;
            return true;
        }

        Scope = new Map([
            ["value", cheddar.prop(new cheddar.func([], function(s ,i) {
                var self = i("self").internal;
                if (toString.call(self) === "[object Object]") {
                    self = JSON.stringify(self);
                } if (self && self.toString) {
                    self = self.toString();
                } else {
                    self = String(self);
                }
                return cheddar.init(cheddar.string, self);
            }))]
        ])
    };
    return v;
}