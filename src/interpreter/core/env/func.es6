import CheddarClass from './class';
import CheddarVariable from './var';
import CheddarScope from './scope';

// I have the details, planing, structure,
// and design of functions all on my
// whiteboard. I'll copy it here later

export default class CheddarFunction {
    constructor(args, body, preset = null) {
        this.args = args;
        this.body = body;
        this.preset = preset;

        // TODO: Redo optimizations lost due to git
        this.cache = {
        };
    }

    exec(input, self) {
        let scope = this.scope(input, self);

        let tmp;
        return this.body(
            scope,
            name => (tmp = scope.accessor(name)) && tmp.Value.value
        );
    }

    scope(input, self) {
        var args = new CheddarScope();
        if (self) {
            args.setter("self", new CheddarVariable(self));
        }
        let tmp;
        for (let i = 0; i < this.args.length; i++) {
            if (input[i]) {
                args.setter(this.args[i][0], new CheddarVariable(
                    input[i]
                ));
            } else {
                if ((tmp = args[i][1]) && tmp.Default) {
                    args.setter(this.args[i][0], new CheddarVariable(
                        tmp.Default
                    ));
                } else {
                    return `Missing argument for ${args[i][0]}`
                }
            }
        }
        return args;
    }
}