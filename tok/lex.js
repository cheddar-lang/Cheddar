/* Generated by Babel */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _tks = require('./tks');

var _tks2 = _interopRequireDefault(_tks);

var CheddarLexer = (function () {
    function CheddarLexer(Code, Index) {
        _classCallCheck(this, CheddarLexer);

        this.Code = Code;
        this.Index = Index;

        this._Tokens = [];
    }

    _createClass(CheddarLexer, [{
        key: "getchar",
        value: function getchar() {
            if (this.Code[this.Index]) return this.Code[this.Index++];else return false;
        }
    }, {
        key: "newtoken",
        value: function newtoken() {
            var fill = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
            this._Tokens[this._Tokens.push(fill) - 1];
        }
    }, {
        key: "addtoken",
        value: function addtoken() {
            var char = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
            this._Tokens[this._Tokens.length - 1] += char;
        }
    }, {
        key: "open",
        value: function open() {
            if (this.Code === null || this.Index === null) throw new TypeError("CheddarLexer: uninitialized code, index.");else this.newtoken();
        }
    }, {
        key: "close",
        value: function close() {
            return this;
        }
    }, {
        key: "error",
        value: function error(id) {
            return id;
        }
    }, {
        key: "Tokens",
        get: function get() {
            return this._Tokens instanceof _tks2["default"] ? this._Tokens : new _tks2["default"](this._Tokens);
        },
        set: function set(v) {
            if (v instanceof _tks2["default"] || v instanceof Array) this._Tokens = v;
        }
    }, {
        key: "isLast",
        get: function get() {
            return this.Index === this.Code.length;
        }
    }]);

    return CheddarLexer;
})();

exports["default"] = CheddarLexer;
module.exports = exports["default"];