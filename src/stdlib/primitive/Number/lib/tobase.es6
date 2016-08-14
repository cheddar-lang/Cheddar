import bases from 'bases';

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default (api) => ["tobase", api.var(new api.func(
    [
        ["base", {}]
    ],
    function(scope, input, rargs) {
        let self = input("self").value;
        let base = input("base");
        let alphabet = ALPHABET;
        let t; // temporary variable

        if (base instanceof api.string) {
            alphabet = base.value;

            if (rargs[1]) {
                if (rargs[1] instanceof api.number) {
                    if (rargs[1].value > alphabet.length) {
                        return "Alphabet was too short for given base";
                    } else {
                        t = rargs[1].value;
                    }
                } else {
                    return "Given string as first argument, second was expected to be number when provided";
                }
            }

            alphabet = alphabet.slice(0, t);

        } else if (base instanceof api.number) {
            if (rargs[1]) {
                if (rargs[1] instanceof api.string) {
                    if (base.value > rargs[1].value.length) {
                        return "Alphabet is too short for given base";
                    } else {
                        alphabet = rargs[1].value;
                    }
                } else {
                    return "Given number as first argument, second was expected to be alphabet when provided.";
                }
            }

            if (base.value > alphabet.length) {
                return "Provide alphabet when converting to base larger than 62";
            }

            if (base.value <= 0) {
                return "Base must be greater than zero";
            }

            alphabet = alphabet.slice(0, base.value);
        } else {
            return "base must be number or string";
        }

        return api.init(api.string, bases.toAlphabet(self, alphabet));
    }
))];