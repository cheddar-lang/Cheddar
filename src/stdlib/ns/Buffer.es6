export default function(cheddar) {
    return class Buffer extends cheddar.class {
        static Name = "Buffer";

        init(bytestream) {

            // If the buffer is not a buffer
            //  assume it is a Cheddar object
            //  therefore throw an error as a
            //  buffer cannot directly be
            //  created from a Cheddar Object
            if (!(bytestream instanceof Buffer)) {
                return "Cannot directly construct buffer, use `Buffer.create`";
            }

            this.value = bytestream;
        }

        accessor = cheddar.class.merge.accessor(function(pointer) {
            return Number.isInteger(+pointer) ?
                cheddar.var(this.value[pointer] || new cheddar.nil) :
                false;
        })
    };
}