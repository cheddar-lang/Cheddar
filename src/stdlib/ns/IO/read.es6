import fs from 'fs';
import path from 'path';

export default function(cheddar) {
    let encoding = require('../Encoding')(cheddar);
    let buffer = require('../Buffer')(cheddar);
    return new cheddar.func(
        [
            ["path", {
                Type: cheddar.string
            }],
            ["encoding", {
                Type: encoding,
                Optional: true
            }]
        ],
        function(scope, input) {
            let pth = input("path").value;
            let encode = input("encoding");
            let file;
            try {
                file = fs.readFileSync(path.join(process.cwd(), pth));
            } catch(e) {
                return e.message;
            }
            var enc = new buffer(null);
            enc.init(file);
            if (!(encode instanceof cheddar.nil)) {
                enc = encode.accessor("decode").Value.exec([enc]);
            }
            return enc;
        }
    );
}