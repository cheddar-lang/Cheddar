import CheddarVariable from './var';
import CheddarScope from './scope';
import CheddarClass from './class';
import NIL from '../consts/nil';

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
        // Move the scope argument to correct prop
        this.inherited = this.args;
        this.Reference = this.body;

        if (!body) {
            body = args;
            args = [];
        }
        else {
            let argument, res = Array(args._Tokens.length);
            for (var i = 0; i < args._Tokens.length; i++) {
                argument = args._Tokens[i];

                // Argument is a arg object
                let props = {};
                let name;

                // Store the argument tokens
                let arg = argument._Tokens;
                let nameargs = arg[0]._Tokens;

                props.Optional = arg[1] === '?';
                props.Default = arg[2] ||
                    arg[1] &&
                    arg[1].constructor.name === "CheddarExpressionToken" &&
                    arg[1];

                props.Type = nameargs.length > 1 && nameargs[1];

                if (props.Type) {
                    let type = this.inherited.accessor(props.Type._Tokens[0]);
                    if (!type) {
                        return `${props.Type._Tokens[0]} is not defined`;
                    }

                    type = type.Value;

                    if (!(type.prototype instanceof CheddarClass)) {
                        return `${props.Type._Tokens[0]} is not a class`;
                    }

                    props.Type = type;
                }

                name = nameargs[0]._Tokens[0];

                res[i] = [name, props];
            }

            args = res;
        }


        this.args = args;
        this.body = body;

        return true;
    }

    exec(input, self) {
        debugger;
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
                this.body.constructor.name === "StatementExpression" ?
                '../eval/eval' :
                '../../exec'
            );

            let res = new executor(
                this.body.constructor.name === "StatementExpression" ?
                this.body :
                this.body._Tokens[0],
                scope
            ).exec();

            return res;
        }
    }

    generateScope(input, self) {
        let args = new CheddarScope(this.inherited || null);

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
                if (tmp.Type && !(input[i] instanceof tmp.Type)) {
                    return `${this.Reference || "function"} expected arg @${i} to be ${
                        tmp.Type.Name ||
                        tmp.Type.constructor.Name ||
                        "object"
                    }, recieved ${
                        input[i].Name ||
                        input[i].constructor.Name ||
                        "object"
                    }`;
                }
                args.setter(this.args[i][0], new CheddarVariable(
                    input[i]
                ));
            }
            else {
                if (tmp.Optional === true) {
                    args.setter(this.args[i][0], new CheddarVariable(
                        new NIL
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