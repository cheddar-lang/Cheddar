import { compress, decompress } from '../../../../local_modules/shoco';

export default function(cheddar, Encoding) {
    let CBuffer = require('../Buffer')(cheddar);

    let shoco = new Encoding();
    shoco.init(
        // Encode
        new cheddar.func([
            ["input", { Type: cheddar.string }]
        ], (s, i) => {
            let b = new CBuffer();
            b.init(Buffer(compress(i("input").value)));
            return b;
        }),
        // Decode
        new cheddar.func([
            ["input", { Type: CBuffer }]
        ], (s, i) => {
            let buf = i("input").value;
            return cheddar.init(cheddar.string, decompress(buffer));
        })
    );
    return shoco;
}