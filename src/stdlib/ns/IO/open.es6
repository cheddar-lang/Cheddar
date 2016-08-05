import fs from 'fs';

export default function(cheddar) {
    let cheddarfd = require("./fd")(cheddar);

    return new cheddar.func([
        ["path", { Type: cheddar.string }],
        ["mode", { }]
    ], function(scope, input) {
        let path = input("path").value;
        let mode = input("mode");

        if (!(mode instanceof cheddar.symbol || mode instanceof cheddar.string)) {
            return "Mode must be valid string or symbol";
        } else {
            mode = mode.value;
        }

        // Ensure `mode` is valid:
        const modes = [
            "r",
            "r+", "rw",
            "w",
            "w+", "wr",
            "a",
            "a+", "ar"
        ];

        if (modes.indexOf(mode) === -1) {
            return `Invalid file mode: \`${mode}\``;
        }

        mode = mode.replace(/(.)./, '$1+');

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
