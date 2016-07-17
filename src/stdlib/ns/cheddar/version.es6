let v = require("../../../../package.json").version;
export default function(cheddar) {
    return cheddar.init(cheddar.string, v);
}