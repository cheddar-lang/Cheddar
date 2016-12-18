import fs from 'fs';
import path from 'path';

export default function(cheddar) {
    return new cheddar.func(
        [
            ["path", {
                Type: cheddar.string
            }]
        ],
        function(scope, input) {
            let pth = input("path").value;

            try {
                fs.unlinkSync(path.join(process.cwd(), pth));
            } catch(e) {
                return e.message;
            }
        }
    );
}
