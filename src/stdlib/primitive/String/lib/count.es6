export default (cheddar) => ["count", cheddar.var(new cheddar.func(
    [
        ["needle", {
            Type: cheddar.string
        }]
    ],
    function(scope, input) {
        let string = input("self").value;
        let strlen = string.length;
        let needle = input("needle").value;

        // If it's less than two, no need to do a lookup
        // just check if the strings are equal
        if (strlen < 2 || needle.length >= strlen) {
            return cheddar.init(cheddar.number, 10, 0, (
                string === needle
            )|0);
        }

        let count = 0;
        // Slower more blunt method
        // don't have too much time to spend on this
        for (let i = 0; i < strlen; i++) {
            if (string.indexOf(needle, i) === i) {
                count++;
            }
        }

        return cheddar.init(cheddar.number, 10, 0, count);

        /*
        let nlen = needle.length;
        let start = needle[0];

        let count  = 0;
        let shift  = 1;
        let i = 0;
        let j;
        let k;

        while (string[i]) {
            if (string[i] === start) {
                j = i;
                k = 0;
                while(k < nlen && string[j] === needle[k]) {

                }
            }
        }*/
    }
))]