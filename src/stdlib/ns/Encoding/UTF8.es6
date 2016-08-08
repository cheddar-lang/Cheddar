export default function(cheddar, Encoding) {
    let Buffer = require('../Buffer')(cheddar);

    let UTF8 = new Encoding();
    UTF8.init(
        // Encode
        new cheddar.func([
            ["input", { Type: cheddar.string }]
        ], (s, i) => {
            return new cheddar.nil;
        }),
        // Decode
        new cheddar.func([
            ["input", { Type: Buffer }]
        ], (s, i) => cheddar.init(
            cheddar.string,
            i("input").value.toString('utf8')
        ))
    );
    return UTF8;
}