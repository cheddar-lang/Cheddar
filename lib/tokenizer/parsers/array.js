'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _chars = require('../consts/chars');

var _expr = require('./expr');

var _expr2 = _interopRequireDefault(_expr);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _primitive = require('../literals/primitive');

var _primitive2 = _interopRequireDefault(_primitive);

var _types = require('../consts/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

class CheddarArrayToken extends _primitive2.default {
    exec() {
        let OPEN = arguments.length <= 0 || arguments[0] === undefined ? _chars.ARRAY_OPEN : arguments[0];
        let CLOSE = arguments.length <= 1 || arguments[1] === undefined ? _chars.ARRAY_CLOSE : arguments[1];
        let PARSER = arguments.length <= 2 || arguments[2] === undefined ? _expr2.default : arguments[2];

        if (this.getChar() !== OPEN) return this.error(CheddarError.EXIT_NOTFOUND);

        while (true) {

            this.jumpWhite();

            if (Array.isArray(PARSER)) {
                let parser = this.grammar.apply(this, [true].concat(_toConsumableArray(PARSER)));
                if (!(parser instanceof _lex2.default)) return this.error(parser);
            } else {
                let value = this.initParser(PARSER),
                    parsed = value.exec();

                this.Index = value.Index;
                if (parsed instanceof _lex2.default) this.Tokens = parsed;else return this.error(parsed);
            }

            this.jumpWhite();

            switch (this.getChar()) {
                case CLOSE:
                    return this.close();
                case _chars.ARRAY_SEPARATOR:
                    break;
                default:
                    return this.error(CheddarError.UNEXPECTED_TOKEN);
            }
        }
    }

    get Type() {
        return _types.ClassType.Array;
    }
}
exports.default = CheddarArrayToken;
module.exports = exports['default'];