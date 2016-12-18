import { execSync } from 'child_process';

export default function(cheddar) {
    let buffer = require('../Buffer')(cheddar);
    return new cheddar.func(
        [
            ["command", {
                Type: cheddar.string
            }],

            ["shell", {
                Type: cheddar.string,
                Default: cheddar.init(cheddar.string, "default")
            }]
        ],
        function(scope, input) {
            let cmd = input("command").value;
            let shell = input("shell").value;

            let res;
            try {
                res = execSync(cmd, {
                    shell: shell === "default" ? undefined : shell
                });

                let buf = new buffer(null);
                buf.init(res);
                return buf;
            } catch(e) {
                return `command errored: ${cmd}`;
            }
        }
    );
}
