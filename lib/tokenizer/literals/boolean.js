'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _primitive = require('./primitive');

var _primitive2 = _interopRequireDefault(_primitive);

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _types = require('../consts/types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarBooleanToken extends _primitive2.default {
    exec() {
        if (this.curchar === 't' && this.Code[this.Index + 1] === 'r' && this.Code[this.Index + 2] === 'u' && this.Code[this.Index + 3] === 'e') {
            this.Index += 4;
            this.Tokens = true;
            return this.close();
        }

        if (this.curchar === 'f' && this.Code[this.Index + 1] === 'a' && this.Code[this.Index + 2] === 'l' && this.Code[this.Index + 3] === 's' && this.Code[this.Index + 4] === 'e') {
            this.Index += 5;
            this.Tokens = false;
            return this.close();
        }

        return this.close(CheddarError.EXIT_NOTFOUND);
    }

    get Type() {
        return _types.ClassType.Boolean;
    }
}
exports.default = CheddarBooleanToken;
module.exports = exports['default'];