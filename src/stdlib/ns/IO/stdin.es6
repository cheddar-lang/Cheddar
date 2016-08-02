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
        // TODO: ensure isTTY before allowing
        ["raw", new cheddar.variable(
            null, {
                Type: cheddar.bool, Writable: true,
                getter: new cheddar.func([], () => cheddar.init(cheddar.bool, process.stdin.isRaw)),
                setter: new cheddar.func(
                    [["value", {}]], (_, input) => (process.stdin.setRawMode(
                       input("value").value
                    ), input("value"))
                )
            }
        )],
    ]);
}
