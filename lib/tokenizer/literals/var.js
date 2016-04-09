'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _chars = require('../consts/chars');

var _literal = require('./literal');

var _literal2 = _interopRequireDefault(_literal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class CheddarVariableToken extends _literal2.default {
    exec() {

        this.open();

        let chr = this.getChar();

        if (_chars.TOKEN_START.indexOf(chr) > -1) {
            this.addToken(chr);

            while (chr = this.getChar()) if (_chars.TOKEN_END.indexOf(chr) > -1) {
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
exports.default = CheddarVariableToken; // Very similar to literal.es6 but with numbers

module.exports = exports['default'];