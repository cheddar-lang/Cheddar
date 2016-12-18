import fs from 'fs';

let _fd; // Cache fd to avoid recreating class
export default function(cheddar) {
    // Cheddar buffer class
    let buffer = require('../Buffer')(cheddar);

    if (_fd) return _fd; // If already generated return it

    // fd class definition
    class fd extends cheddar.class {
        // Call it fd as there's no need to
        // have a fancy name as this is
        // mostly under the hood things which
        // isn't revealed ever
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

            // The uint refering to the fd
            this.fd = fd;

            // Whether or not the file descriptor is actually closed
            this.closed = false;

            // Position within the fd.
            // this shoud ALWAYS be
            // incremented whenever
            // read
            this.pos = 0;
        }

        Scope = new Map([
            // Getter for `fd` linked to `self.fd`
            ["pos", new cheddar.variable(null, {
                getter: new cheddar.func([], (_, i) => cheddar.init(cheddar.number, 10, 0, i("self").pos)),
                Type: cheddar.number,
                Writable: false
            })],

            /*== FD Functions ==*/

            // Read command which reads n bytes from
            // the given buffer
            ["read", cheddar.var(new cheddar.func([
                ["bytes", { Type: cheddar.number }],

                // Specify position to read from
                // Allow to be optional. Doesn't
                // use a default and instead Optional
                // so we can dynamically determine
                // the last position read to using
                // `self.pos`
                ["position", {
                    Type: cheddar.number,
                    Optional: true
                }]
            ], function(scope, input) {
                // Amount of bytes to skip
                // Default is one byte but
                // in such a case it's a
                // better idea to use IO.readc
                let bytes = input("bytes").value;
                let self = input("self");

                // Check if fd is open
                if (self.closed === true) {
                    return "Cannot read a closed stream";
                }

                // Buffer to place read bytes in
                let buf = new Buffer(bytes);

                // Read, the fd's contents from position `self.pos`
                // to `buf` reading `bytes` bytes.
                let bytes_read = fs.readSync(self.fd, buf, 0, bytes, self.pos);

                // Increase amount of bytes read
                self.pos += bytes_read;

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

                // Position in file to write to, defaulting to one
                ["position", {
                    Type: cheddar.number,
                    // Default to 0 or start of file
                    Default: cheddar.init(cheddar.number, 10, 0, NaN)
                }]
            ], function(scope, input) {
                // The file descriptor object
                let self = input("self");

                // Position to write to
                let position = input("position").value;

                // Check if fd is open
                if (self.closed === true) {
                    return "Cannot write a closed stream";
                }

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
                    // position is at `position`, default 0
                    if (isNaN(position))
                        fs.writeSync(self.fd, writing);
                    else
                        fs.writeSync(self.fd, writing, position);
                } catch(e) {
                    // TODO: handle this error better
                    return `Could not write,  error ${e.code}`;
                }

                // Return self for chaining
                return self;
            }))],

            // Close the fd and return null
            ["close", cheddar.var(new cheddar.func([], function(scope, input) {
                // The fd object
                let self = input("self");

                // Check if fd is open
                if (self.closed === true) {
                    return "File descriptor has already been closed";
                }

                // Close the file descriptor
                // Use sync alternative to ensure
                // it's actually closed
                fs.closeSync(self.fd);

                // Set the closed attribute to true
                // so write and read functions don't
                // R/W over arbitrary memory
                self.closed = true;

                // Return nil because what else to return
                return new cheddar.nil;
            }))]
        ]);
    }

    return _fd = fd;
};
