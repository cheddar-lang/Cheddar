import fs from 'fs';

export default function(cheddar) {
    let cheddarfd = require("./fd")(cheddar);

    // File descriptor for stdin
    let f = new cheddarfd(null);
    f.init(process.stdin.fd);

    return cheddar.namespace([
        ["fd", cheddar.var(f)],
        ["opened", new cheddar.variable(
            null, {
                Type: cheddar.bool, Writable: true,
                getter: new cheddar.func([], () => new cheddar.nil),
                setter: new cheddar.func(
                    [["value", {}]], (_, input) => input("value").value
                        ? process.stdin.resume()
                        : process.stdin.pause()
                )
            }
        )],
        ["isTTY", cheddar.var(cheddar.init(cheddar.bool, process.stdin.isTTY))],
        ["raw", new cheddar.variable(
            null, {
                Type: cheddar.bool, Writable: true,
                getter: new cheddar.func([], () => cheddar.init(cheddar.bool, process.stdin.isRaw || false)),
                setter: new cheddar.func(
                    [["value", {}]], (_, input) => {
                        if (process.stdin.isTTY) {
                            process.stdin.setRawMode(input("value").value)
                        }

                        return input("value");
                    }
                )
            }
        )],
    ]);
}
