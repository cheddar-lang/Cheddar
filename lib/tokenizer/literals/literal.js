'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _chars = require('../consts/chars');

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarLiteral extends _lex2.default {
    exec() {

        this.open();

        let chr = this.getChar();

        if (_chars.TOKEN_START.indexOf(chr) > -1) {
            this.addToken(chr);

            while (chr = this.getChar()) if (_chars.TOKEN_START.indexOf(chr) > -1) {
                this.addToken(chr);
            } else {
                --this.Index;
                break;
            }
            return this.close();
        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}
exports.default = CheddarLiteral;
module.exports = exports['default'];