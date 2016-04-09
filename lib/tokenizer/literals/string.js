'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _primitive = require('./primitive');

var _primitive2 = _interopRequireDefault(_primitive);

var _chars = require('../consts/chars');

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _types = require('../consts/types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarStringToken extends _primitive2.default {
    exec() {

        this.open();

        let chr = this.getChar();
        if (_chars.STRING_DELIMITERS.indexOf(chr) > -1) {
            // in a string

            let qt = chr; // store quote

            while (chr = this.getChar()) if (chr === qt) break;else if (this.isLast) return this.error(CheddarError.UNMATCHED_DELIMITER);else if (chr === _chars.STRING_ESCAPE) this.addToken(this.getChar());else this.addToken(chr);

            return this.close();
        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }

    get Type() {
        return _types.ClassType.String;
    }
}
exports.default = CheddarStringToken;
module.exports = exports['default'];