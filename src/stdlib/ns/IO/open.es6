import fs from 'fs';

export default function(cheddar) {
    let cheddarfd = require("./fd")(cheddar);

    return new cheddar.func([
        ["path", { Type: cheddar.string }],
        ["mode", { Type: cheddar.string }]
    ], function(scope, input) {
        let path = input("path").value;
        let mode = input("mode").value;

        // Ensure `mode` is valid:
        const modes = [
            "r",
            "r+",
            "w",
            "w+",
            "a",
            "a+"
        ];

        if (modes.indexOf(mode) === -1) {
            return `Invalid file mode: \`${mode}\``;
        }

        try {
            let fd_pointer = fs.openSync(path, mode);
            let fd = new cheddarfd(null);
            fd.init( fd_pointer );
            return fd;
        } catch(e) {
            // TODO: Replace with signals
            console.log(e);
            return "Error with IO.open";
        }
    });
}
