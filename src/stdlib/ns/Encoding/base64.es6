import atob from 'atob';
import btoa from 'btoa';

export default function(cheddar, Encoding) {
    let Buffer = require('../Buffer')(cheddar);

    let base64 = new Encoding();
    base64.init(
        // Encode
        new cheddar.func([
            ["input", { Type: [Buffer, cheddar.string] }]
        ], (s, i) => cheddar.init(
            cheddar.string,
            btoa(i("input").value)
        )),
        // Decode
        new cheddar.func([
            ["input", { Type: [Buffer, cheddar.string] }]
        ], (s, i) => {
            try {
                return cheddar.init(cheddar.string, atob(i("input").value));
            } catch(e) {
                return `invalid base64 string`;
            }
        })
    );
    return base64;
}