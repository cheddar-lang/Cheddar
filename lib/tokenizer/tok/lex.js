'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _tks = require('./tks');

var _tks2 = _interopRequireDefault(_tks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

class CheddarLexer {
    constructor(Code, Index) {
        this.Code = Code;
        this.Index = Index;

        this._Tokens = [];
    }

    getChar() {
        return this.Code[this.Index++];
    }

    get curchar() {
        return this.Code[this.Index];
    }

    newToken() {
        let fill = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        this._Tokens[this._Tokens.push(fill) - 1];return this;
    }
    addToken() {
        let char = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        this._Tokens[this._Tokens.length - 1] += char;return this;
    }

    get last() {
        return this._Tokens[this._Tokens.length - 1];
    }

    open(forceNot) {
        if (this.Code === null || this.Index === null) throw new TypeError('CheddarLexer: uninitialized code, index.');else if (forceNot !== false) this.newToken();
    }

    close(arg) {
        delete this.Code;
        return arg || this;
    }
    error(id) {
        return id;
    }

    get Tokens() {
        return new _tks2.default(this._Tokens);
    }
    set Tokens(v) {
        var _Tokens;

        if (Array.isArray(v)) (_Tokens = this._Tokens).push.apply(_Tokens, _toConsumableArray(v));else this._Tokens.push(v);
    }

    get isLast() {
        return this.Index === this.Code.length;
    }

    parse(parseClass) {
        if (parseClass.prototype instanceof CheddarLexer) {
            // Run provided parser
            let Parser = new parseClass(this.Code, this.Index);

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            let ParserResult = Parser.exec.apply(Parser, args);

            // Add new tokens
            // this does NOT override old tokens
            // this is because `this.Tokens` has
            // a custom setter
            this.Tokens = Parser;
            this.Index = Parser.Index;

            return ParserResult;
        } else {
            throw new TypeError('CheddarLexer: provided parser is not a CheddarLexer');
        }
    }

    attempt() {
        let attempt;

        for (var _len2 = arguments.length, parsers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            parsers[_key2] = arguments[_key2];
        }

        for (let i = 0; i < parsers.length; i++) {
            if (parsers[i] instanceof CheddarLexer) {
                parsers[i].Code = this.Code;
                parsers[i].Index = this.Index;
                attempt = parsers[i].exec();
            } else {
                attempt = this.initParser(parsers[i]).exec();
            }
            if (attempt instanceof CheddarLexer) return attempt;else if (attempt !== CheddarError.EXIT_NOTFOUND) return this.error(attempt);
        }

        return this.error(CheddarError.EXIT_NOTFOUND);
    }

    initParser(parseClass) {
        if (parseClass instanceof CheddarLexer) {
            parseClass.Code = this.Code;
            parseClass.Index = this.Index;
            return parseClass;
        } else if (parseClass.prototype instanceof CheddarLexer) {
            return new parseClass(this.Code, this.Index);
        } else throw new TypeError('CheddarLexer: provided parser is not a CheddarLexer ');
    }

    tok() {
        let n = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        return this._Tokens[n];
    }

    grammar(whitespace) {
        //TODO: remove unused stuff (if any)
        // defs<Array<CheddarLexer or String>>
        let index, parser, result, tokens, i, j;

        for (var _len3 = arguments.length, defs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            defs[_key3 - 1] = arguments[_key3];
        }

        main: for (i = 0; i < defs.length; i++) {
            index = this.Index;
            tokens = [];
            sub: for (j = 0; j < defs[i].length; j++) {
                if (whitespace) {
                    let oldIndex = this.Index;
                    this.Index = index;
                    this.jumpWhite();
                    index = this.Index;
                    this.Index = oldIndex;
                }
                if (defs[i][j] instanceof CheddarLexer) {
                    parser = defs[i][j];
                    parser.Code = this.Code;
                    parser.Index = index;
                    result = parser.exec();

                    if (result === CheddarError.EXIT_NOTFOUND) continue main;else if (!(result instanceof CheddarLexer)) return this.error(result);

                    index = parser.Index;

                    tokens.push(result);
                } else if (defs[i][j].prototype instanceof CheddarLexer) {
                    parser = new defs[i][j](this.Code, index);
                    result = parser.exec();

                    if (result === CheddarError.EXIT_NOTFOUND) continue main;else if (!(result instanceof CheddarLexer)) return this.error(result);

                    index = parser.Index;

                    // Filters out meaningless data
                    if (!(result.constructor.name.endsWith('Alpha') && result._Tokens.length === 0)) tokens.push(result);
                } else if (defs[i][j] === this.jumpWhite) {
                    let oldIndex = this.Index;
                    this.Index = index;
                    this.jumpWhite();
                    index = this.Index;
                    this.Index = oldIndex;
                } else if (Array.isArray(defs[i][j])) {
                    if (defs[i][j].length === 1) {
                        if (Array.isArray(defs[i][j][0])) {
                            var _defs$i;

                            // TODO: not recommended; creates 2^optionals new rules
                            //slice(0) clones array
                            let def = defs[i].slice(0);
                            def.splice(j, 1);
                            defs.splice(i + 1, 0, def);
                            (_defs$i = defs[i]).splice.apply(_defs$i, [j, 1].concat(_toConsumableArray(defs[i][j][0])));
                            i--;
                            continue main;
                        }
                        // Optional
                        result = this.initParser(defs[i][j][0]).exec();
                        if (result !== CheddarError.EXIT_NOTFOUND) {
                            if (!(result instanceof CheddarLexer)) {
                                return this.error(result);
                            } else {
                                index = parser.Index;

                                // Filter
                                if (!(result.constructor.name.endsWith('Alpha') && result._Tokens.length === 0)) tokens.push(result);
                            }
                        }
                    } else {
                        // OR
                        let match;
                        let oldIndex = this.Index;
                        for (let k = 0; k < defs[i][j].length; k++) {
                            this.Index = index;
                            if (defs[i][j][k] instanceof CheddarLexer) {
                                result = this.initParser(defs[i][j][k]).exec();
                                if (result instanceof CheddarError) {
                                    match = result;
                                    index = result.Index;
                                    break;
                                }
                                if (result !== CheddarError.EXIT_NOTFOUND) return this.error(result);
                            } else {
                                result = this.jumpLiteral(defs[i][j][k]);
                                if (result) {
                                    match = defs[i][j][k];
                                    index = this.Index;
                                    break;
                                }
                            }
                        }
                        this.Index = oldIndex;

                        if (match) {
                            if (!(result.constructor.name.endsWith('Alpha') && result._Tokens.length === 0)) {
                                tokens.push(match);
                                continue sub;
                            }
                        } else {
                            // this.Index = result.Index;
                            return this.error(CheddarError.EXIT_NOTFOUND);
                        }
                    }
                } else {
                    let oldIndex = this.Index;
                    this.Index = index;
                    result = this.jumpLiteral(defs[i][j]);
                    if (result) index = this.Index;
                    this.Index = oldIndex;
                    if (!result) continue main;
                }
            }

            this.Tokens = tokens;
            this.Index = index;

            return this.close();
        }

        return this.error(CheddarError.EXIT_NOTFOUND);
    }

    /*
    Whitespace Grammar:
    W -> w
         w C1 w
         w C2 w
         ... etc
     Right-recursive:
    W -> w α
         α
    α -> C1 W
         C2 W
     where C1...CN are terminal comment grammars
    */
    jumpWhite() {
        while (/\s/.test(this.Code[this.Index])) this.Index++;

        this._jumpComment();
        return this;
    }

    _jumpComment() {
        if (this.Code[this.Index] === '/') {
            switch (this.Code[this.Index + 1]) {
                case '*':
                    // match till EOF or '*/'
                    this.Index += 2;
                    this._jumpBlockComment();
                    break;
                case '/':
                    // match till EOF or newline
                    this.Index += 2; // jump ahead to the start of the comment
                    while (this.curchar && this.curchar !== '\n') this.Index++;
                    break;
                default:
                    return;
            }
            return this.jumpWhite();
        }

        //if (!(this.Code[this.Index] === this.Code[this.Index + 1] === '/'))
        //    return this;
        //this.Index = /\n/.exec(this.Code.slice(this.Index));
        //return this;
    }

    _jumpBlockComment() {
        let nextStart,
            nextEnd,
            depth = 1,
            newIndex = this.Index + 2;
        while (depth) {
            nextStart = this.Code.indexOf('/*', newIndex);
            nextEnd = this.Code.indexOf('*/', newIndex);
            if (nextStart < nextEnd) {
                depth++;
                newIndex = nextStart + 2;
            } else {
                depth--;
                newIndex = nextEnd + 2;
            }
            if (nextEnd === -1) return this.error(CheddarError.UNEXPECTED_TOKEN);
        }
        this.Index = newIndex;
        return this;
    }

    jumpLiteral(l) {
        //TODO: make more efficient
        //downgoat D: this returned first index
        //took me 6 hours to figure out the problem :(
        //D: D: D:
        if (new RegExp('^.{' + this.Index + '}' + l.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).test(this.Code)) this.Index += l.length;else return false;
        return this;
    }

    get isExpression() {
        return false;
    }

    get isPrimitive() {
        return false;
    }
}
exports.default = CheddarLexer;
module.exports = exports['default'];