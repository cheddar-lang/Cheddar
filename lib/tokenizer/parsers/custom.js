'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CheddarCustomLexer;

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CheddarCustomLexer(orig) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    let parser = new _lex2.default();
    parser.exec = function () {
        var _ref;

        return (_ref = new orig(this.Code, this.Index)).exec.apply(_ref, args);
    };
    return parser;
}
module.exports = exports['default'];