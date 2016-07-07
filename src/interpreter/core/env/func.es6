import CheddarVariable from './var';
import CheddarScope from './scope';
import CheddarClass from './class';
import nil from '../primitives/nil';

// I have the details, planing, structure,
// and design of functions all on my
// whiteboard. I'll copy it here later

export default class CheddarFunction extends CheddarClass {
    static Name = "Function";

    constructor(args, body, preset = null) {
        super();

        this.args = args;
        this.body = body;
        this.preset = preset;

        // TODO: Redo optimizations lost due to git
        this.cache = {};
    }

    // Initalizes from primitive arguments
    init(args, body) {
        if (!body) {
            body = args;
            args = [];
        }
        else {
            args = args._Tokens.map(argument => {
                // Argument is a arg object
                let props = {};
                let name;

                // Store the argument tokens
                let args = argument._Tokens;
                let nameargs = args[0]._Tokens;

                props.Optional = args[1] === '?';
                props.Default = args[2] ||
                    args[1] &&
                    args[1].constructor.name === "CheddarExpressionToken" &&
                    args[1];

                props.Type = nameargs.length > 1 && nameargs[0];

                name = (nameargs[1] || nameargs[0])._Tokens[0];

                return [name, props];
            });
        }

        // Move the scope argument to correct prop
        this.preset = this.args;
        this.scope  = this.args;
        this.Reference = this.body;

        this.args = args;
        this.body = body;

        return true;
    }

    exec(input, self) {
        let scope = this.generateScope(input, self);

        if (!(scope instanceof CheddarScope))
            return scope;

        let tmp;
        if (typeof this.body === 'function') {
            return this.body(
                scope,
                name => (tmp = scope.accessor(name)) && tmp.Value
            );
        } else {
            let executor = require(
                this.body.constructor.name === "CheddarExpressionToken" ?
                '../eval/eval' :
                '../../exec'
            );

            let res = new executor(this.body, scope).exec();
            console.log(res);
        }
    }

    generateScope(input, self) {
        let args = new CheddarScope(this.scope || null);
        let CheddarArray = require('../primitives/Array');
        let tmp;

        if (self)
            args.setter("self", new CheddarVariable(self, {
                Writeable: false
            }));

        for (let i = 0; i < this.args.length; i++) {
            tmp = this.args[i][1];
            if (tmp.Splat === true) {
                let splat = new CheddarArray();
                splat.init(...input.slice(i));

                args.setter(this.args[i][0], new CheddarVariable(
                    splat
                ));

                break;
            }
            else if (input[i]) {
                args.setter(this.args[i][0], new CheddarVariable(
                    input[i]
                ));
            }
            else {
                if (tmp.Optional === true) {
                    args.setter(this.args[i][0], new CheddarVariable(
                        new nil
                    ));
                }
                else if (tmp.Default) {
                    args.setter(this.args[i][0], new CheddarVariable(
                        tmp.Default
                    ));
                }
                else {
                    return `Missing argument for ${this.args[i][0]}`
                }
            }
        }
        return args;
    }
}