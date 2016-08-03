import fs from 'fs';

let _fd; // Cache fd to avoid recreating class
export default function(cheddar) {
    // Cheddar buffer class
    let buffer = require('../Buffer')(cheddar);

    if (_fd) return _fd; // If already generated return it

    // fd class definition
    class fd extends cheddar.class {
        static Name = "fd";

        init(fd) {
            // If file descriptor is not a number
            // then just assume its a bad class from
            // cheddar
            //
            // even though the class is not directly
            // exposed we must handle for it due to
            // `what is` operator
            if (typeof fd !== "number") {
                return `Cannot construct file descriptor. Use \`IO.open\` instead`;
            }

            this.fd = fd;
        }

        Scope = new Map([
            // Read command which reads n bytes from
            // the given buffer
            ["read", cheddar.var(new cheddar.func([
                ["bytes", { Type: cheddar.number }]
            ], function(scope, input) {
                // Amount of bytes to skip
                // Default is one byte but
                // in such a case it's a
                // better idea to use IO.readc
                let bytes = input("bytes").value;
                let self = input("self");

                // Buffer to place read bytes in
                let buf = new Buffer(bytes);

                // Read, fd->buffer@buffer[0] w/ `bytes` bytes
                fs.read(self.fd, buf, 0, bytes);

                // Resulting Cheddar buffer
                let res = new buffer(null);
                // initalize it with `buf`
                res.init(buf);
                // Return the resulting buffer
                return res;
            }))],

            // Write command. which writes a
            // string or buffer to file
            ["write", cheddar.var(new cheddar.func([
                ["bytes", {}],
            ], function(scope, input) {
                // The file descriptor object
                let self = input("self");

                // The given bytes
                let bytes = input("bytes");
                
                // What is actually being written
                // Will be set to Buffer or String
                let writing;

                // Check whether a string or buffer was given
                if (bytes instanceof cheddar.string) {
                    writing = bytes.value; // Write the literal string
                } else if (bytes instanceof buffer) {
                    writing = bytes.value; // Extract node buffer
                } else {
                    // If it's not a string or buffer, error
                    return `Bytes to write must be string or buffer`;
                }

                try {
                    // Perform the write
                    // write `writing` to self.fd
                    // offset 0, with length writing, 
                    fs.writeSync(self.fd, writing, 0, writing.length);
                } catch(e) {
                    // TODO: handle this error better
                    return `Could not write,  error ${e.code}`;
                }

                // Return self for chaining
                return self;
            }))]
        ]);
    }

    return _fd = fd;
};
