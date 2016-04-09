'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _ops = require('../consts/ops');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class CheddarOperatorToken extends _lex2.default {
    exec() {
        let ops = arguments.length <= 0 || arguments[0] === undefined ? _ops.OP : arguments[0];

        // this.Code is the code
        // this.Index is the index
        this.open(false);

        let op;
        for (let i = 0; i < ops.length; i++) {
            if (this.Code.indexOf(ops[i], this.Index) === this.Index) {
                if ((!op || op.length < ops[i].length) && !(/[a-z][a-z0-9]*/i.test(ops[i]) && /[a-z0-9]/i.test(this.Code[this.Index + ops[i].length]))) op = ops[i];
            }
        }

        if (op) {
            this.Tokens = op;
            this.Index += op.length;
            return this.close();
        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}
exports.default = CheddarOperatorToken;
module.exports = exports['default'];