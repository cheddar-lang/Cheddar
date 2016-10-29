var v;
let toString = {}.toString;
export default function(cheddar) {
    if (v) return v;
    v = class Interface extends cheddar.class {
        static Name = "Interface";

        init(val) {
            this.internal = val;
            return true;
        }

        accessor(item) {
            let result = this.Scope.get(item);
            if (result) return result;

            var self = this.internal;
            try {
                let r = self[item];
                if (!r) throw `\`${item}\` is not a property`;
                let res = new (require('./primitive')(cheddar))(null);
                res.init(r);
                return cheddar.var(res);
            } catch(e) {
                return `Cannot access property \`${item}\`: "${e.message}"`;
            }
        }

        Scope = new Map([
            ['c', cheddar.prop(new cheddar.func([], function(s, inp) {
                let self = inp("self");
                if (typeof self.internal !== 'function') {
                    return `Cannot generate caller for non-functional interface`;
                }

                return new cheddar.func([
                    ["args", { Splat: true }]
                ], function(scope, input) {
                    let val = input("args").value;
                    let primitive = require('./primitive')(cheddar);
                    for (let i = 0; i < val.length; i++) {
                        if (!(val[i] instanceof Interface)) {
                            if (val[i].value && (
                                val[i] instanceof cheddar.array ?
                                val[i].value[0] instanceof Interface :
                                true
                            )) {
                                val[i] = val[i].value;
                            }
                            else {
                                return `Cannot translate \`${val[i].Name || val[i].constructor.Name || "object"}\` to a primitive type. Ensure all items are primitives`;
                            }
                        } else {
                            val[i] = val[i].internal;
                        }
                    }
                    try {
                        let r = new primitive();
                        r.init(self.internal(...val));
                        return r;
                    } catch(e) {
                        return `Error ${e.message}`;
                    }
                });
            }))]
        ])

        Cast = new Map([
            ['String', function(item) {
                var self = item.internal;
                if (toString.call(self) === "[object Object]") {
                    self = JSON.stringify(self);
                }
                if (self && self.toString) {
                    self = self.toString();
                }
                else {
                    self = String(self);
                }
                return cheddar.init(cheddar.string, self);

            }]
        ])
    }
    return v;
}
