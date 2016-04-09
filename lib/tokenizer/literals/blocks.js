'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: do while
class CheddarBlockNameToken extends _lex2.default {
    exec() {
        if (this.curchar === 'i' && this.Code[this.Index + 1] === 'f') {
            this.Index += 2;
            this.Tokens = 'if';
            return this.close();
        }

        if (this.curchar === 'f' && this.Code[this.Index + 1] === 'o' && this.Code[this.Index + 2] === 'r') {
            this.Index += 3;
            this.Tokens = 'for';
            return this.close();
        }

        if (this.curchar === 'w' && this.Code[this.Index + 1] === 'h' && this.Code[this.Index + 2] === 'i' && this.Code[this.Index + 3] === 'l' && this.Code[this.Index + 4] === 'e') {
            this.Index += 5;
            this.Tokens = 'while';
            return this.close();
        }

        return this.close(CheddarError.EXIT_NOTFOUND);
    }
}
exports.default = CheddarBlockNameToken;
module.exports = exports['default'];