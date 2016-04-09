'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _expr = require('./expr');

var _expr2 = _interopRequireDefault(_expr);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//TODO
class CheddarParenthesizedExpression extends _lex2.default {
    exec() {
        this.open(false);

        /*
        This may be shorter:
        return this.grammar(true, ['(', CheddarExpressionToken , ')']);
        */
        // @Downgoat you change it if it works

        if (this.getChar() !== '(') this.error(CheddarError.EXIT_NOTFOUND);

        this.jumpWhite();

        let attempt = this.initParser(_expr2.default).exec();
        if (!(attempt instanceof _lex2.default)) this.error(CheddarError.UNEXPECTED_TOKEN);

        this.Tokens = attempt.Tokens;
        this.Index = attempt.Index;

        this.jumpWhite();

        if (this.getChar() !== ')') this.error(CheddarError.UNMATCHED_DELIMITER);

        this.close();
        // TODO: shouldn't these be returns? (also, is this even needed anymore?)
    }
}
exports.default = CheddarParenthesizedExpression;
module.exports = exports['default'];