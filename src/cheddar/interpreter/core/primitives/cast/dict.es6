import CheddarString from '../String';
import HelperInit from '../../../../helpers/init';

function padItem(str) {
    let lines = str.split(/\r?\n/g);
    if (lines.length < 2) return str;

    for (var i = 1; i < lines.length; i++) {
        lines[i] = '  ' + lines[i];
    }

    return lines.join("\n");
}

export default new Map([
    ['String', (self) => {
        // Output strings without delimiter
        var string = "";

        // From each key, obtain the string representation of both sides
        // O: KEEP
        self.value.forEach((value, key) => {
            let [k, v] = [key, value].map(
                // Convert `item` to string representation
                // pad with 4 spaces then
                (item) => {
                    // Get the primitive value
                    let value;
                    if (typeof item !== 'object' && typeof item !== 'function') {
                        // Handle primitives
                        value = typeof item == 'string' ? JSON.stringify(item) : item;
                    } else {
                        value = item.Cast && item.Cast.has("String") ? item.Cast.get("String")(item).value : `<${item.Name || item.constructor.Name}>`;
                    }

                    if (item instanceof self.constructor) return padItem(value);
                    else return value;
                }
            );

            string += `\n  ${k}: ${v}`;
        });

        if (!string) return HelperInit(CheddarString, "[:]");

        return HelperInit(CheddarString, `[${string}\n]`);
    }]
]);
