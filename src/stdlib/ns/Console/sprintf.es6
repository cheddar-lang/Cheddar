/**
 * Cheddar, IO.sprintf(<format>, [args ...])
 *
 * Format specification:
 * %[flag][width][.precision]specifier]
 *
 * flag:
 *  -      left justification
 *  +      requires sign to show
 *  #      preceedes value with 0x 0o or 0b
 *  0      prepends width with 0s rather than spaces
 * width:
 *  0-9+   specifies width
 *  *      specifies width from argument
 * precision:
 *  0-9+   specifies width
 *  *      specifies width from argument
 * specifier:
 *  d      decimal
 *  i      integer
 *  x      hexadecimal
 *  X      heXadecimal (uppercase X)
 *  x      binary
 *  X      Binary (uppercase B)
 *  o      octal
 *  O      Octal (uppercase O)
 *  r      array
 *  s      string
 *  c      char, first char of string
 **/

export default function(cheddar) {

    const FORMAT_REGEX =
        /%(-?\+?#?0?)(\d+|\*)?(\.\d+|\.\*)?([dixXbBoOrsc])/gi;

    // Format of method:
    // [type, cast]
    // cast:
    //  V - object
    //  C - object's cast methods
    // **must** return JS string
    const FORMAT = {
        NUMBER: 'dixXbBoO',
        BASE: 'xXbBoO',
        SPECIFIER: {
            r: [cheddar.array,  (V, C) => C.get("String")(V).value],
            d: [cheddar.number, (V, C) => C.get("String")(V).value],
            i: [cheddar.number, (V, C) => C.get("String")(V).value],
            x: [cheddar.number, (V, C) => (+V.value).toString(16)],
            X: [cheddar.number, (V, C) => (+V.value).toString(16).toUpperCase()],
            b: [cheddar.number, (V, C) => (+V.value).toString(2)],
            B: [cheddar.number, (V, C) => (+V.value).toString(2)],
            o: [cheddar.number, (V, C) => (+V.value).toString(8)],
            O: [cheddar.number, (V, C) => V.value.toString(8)],
            s: [cheddar.string, (V, C) => V.value],
            c: [cheddar.string, (V, C) => V.value[0]]
        }
    };

    return new cheddar.func(
        [
            ["format", {
                Type: cheddar.string
            }],
            ["args", {
                Splat: true
            }]
        ],
        function(scope, input) {
            let formats = input("format").value;
            let arglist = input("args").value;
            let idx = 0;
            let tmp;

            const REPLACE_WILDCARD = VAL =>
                VAL === "*" ?
                ( // If it's a wildcard get it
                    (tmp = arglist[idx++]) instanceof cheddar.number ?
                    tmp.value :
                    false
                ) :
                +VAL; // Otherwise covert to int

            // Simply replace
            let result = formats.replace(
                FORMAT_REGEX, (MATCH,
                    FLAG, WIDTH = 0, PRECISION = 0, SPECIFIER
                ) => {
                    // Replaces wildcards with arglist value

                    WIDTH = REPLACE_WILDCARD(WIDTH);
                    PRECISION = REPLACE_WILDCARD(PRECISION);

                    if (WIDTH === false || PRECISION === false) {
                        idx++;
                        return MATCH;
                    }

                    // If the arg type is correctly matching the specifier's
                    if ((tmp = arglist[idx++]) instanceof FORMAT.SPECIFIER[SPECIFIER][0]) {
                        // Convert to a string using given cast
                        let res = FORMAT.SPECIFIER[SPECIFIER][1](
                            tmp,
                            tmp.Cast
                        );

                        if (FORMAT.NUMBER.indexOf(SPECIFIER) > -1) {
                            res = res.replace(
                                /\..+/,
                                DECIMAL =>
                                DECIMAL + "0".repeat(Math.max(0,
                                    PRECISION - DECIMAL.length + 1
                                ))
                            );
                        }

                        if (FORMAT.NUMBER.indexOf(SPECIFIER) > -1) {
                            let neg;

                            // Check if negative, remove sign
                            if (res[0] === '-') {
                                res = res.slice(1);
                                neg = true;
                            }

                            // Implements `#` flag and is base
                            if (FORMAT.BASE.indexOf(SPECIFIER) > -1 &&
                                FLAG.indexOf('#') > -1) {
                                res = `0${SPECIFIER}${res}`
                            }

                            // Re-add negative sign if needed
                            if (neg) {
                                res = '-' + res;
                            }

                            // Add + sign if needed and `+` flag
                            if (FLAG.indexOf('+') > -1) {
                                if (!neg) {
                                    res = '+' + res;
                                }
                            }
                        }

                        if (WIDTH > res.length) {
                            // Length to pad
                            let padlen = WIDTH - res.length;

                            // Default character to pad with is space
                            let padchr = " ";

                            if (FLAG.indexOf("0") > -1) {
                                padchr = "0";
                            }

                            if (FLAG.indexOf('-') > -1) {
                                res += padchr.repeat(padlen);
                            }
                            else {
                                res = padchr.repeat(padlen) + res;
                            }
                        }

                        return res;

                    }
                    else {
                        return MATCH;
                    }
                }
            );

            return cheddar.init(cheddar.string, result);
        }
    );
}
