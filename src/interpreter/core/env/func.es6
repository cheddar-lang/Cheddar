import CheddarVariable from './var';
import CheddarScope from './scope';
import nil from '../primitives/nil';

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

        if (!(scope instanceof CheddarScope))
            return scope;

        let tmp;
        return this.body(
            scope,
            name => (tmp = scope.accessor(name)) && tmp.Value
        );
    }

    scope(input, self) {
        let args = new CheddarScope();
        let CheddarArray = require('../primitives/Array');
        let tmp;

        if (self)
            args.setter("self", new CheddarVariable(self, { Writeable: false }));

        for (let i = 0; i < this.args.length; i++) {
            tmp = this.args[i][1];
            if (tmp.Splat === true) {
                let splat = new CheddarArray();
                splat.init(...input.slice(i));

                args.setter(this.args[i][0], new CheddarVariable(
                    splat
                ));

                break;
            } else if (input[i]) {
                args.setter(this.args[i][0], new CheddarVariable(
                    input[i]
                ));
            } else {
                if (tmp.Optional === true) {
                    args.setter(this.args[i][0], new CheddarVariable(
                        new nil
                    ));
                } else if (tmp.Default) {
                     args.setter(this.args[i][0], new CheddarVariable(
                        tmp.Default
                    ));
                } else {
                    return `Missing argument for ${this.args[i][0]}`
                }
            }
        }
        return args;
    }
}