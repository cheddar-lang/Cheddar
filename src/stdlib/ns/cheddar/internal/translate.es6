export default function(cheddar) {
    let primitive = require('./primitive')(cheddar);
    let module = require('./module')(cheddar);
    return new cheddar.func([
        ["value", {}]
    ], function(scope, input) {
        let value = input("value");
        if (value instanceof module) {
            let js = new primitive(null);
            js.init(value.internal);
            return js;
        }
        else if (value.value && (
                value instanceof cheddar.array ?
                value.value[0] instanceof primitive :
                true
            )) {
            let js = new primitive(null);
            js.init(value.value);
            return js;
        }
        else {
            return `Cannot translate \`${value.Name || value.constructor.Name || "object"}\` to a primitive type. Ensure all items are primitives`;
        }
    });
}