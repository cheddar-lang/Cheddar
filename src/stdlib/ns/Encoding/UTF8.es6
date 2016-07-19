import Buffer from '../Buffer';

export default function(cheddar, Encoding) {
    let UTF8 = new Encoding();
    UTF8.init(
        // Encode
        new cheddar.func([
            ["input", { Type: cheddar.string }]
        ], (s, i) => {

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