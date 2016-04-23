import * as CheddarError from '../consts/err';
import CheddarTokens from './tks';

export default class CheddarLexer {
    constructor(Code, Index) {
        this.Code  = Code;
        this.Index = Index;

        this._Tokens = [];
    }

    getChar() {
        return this.Code[this.Index++];
    }

    get curchar() { return this.Code[this.Index] }

    newToken(fill = '') { this._Tokens[this._Tokens.push(fill) - 1]; return this }
    addToken(char = '') { this._Tokens[this._Tokens.length - 1] += char; return this }

    get last() { return this._Tokens[this._Tokens.length - 1] }

    open(forceNot) {
        if (this.Code === null || this.Index === null)
            throw new TypeError('CheddarLexer: uninitialized code, index.');
        else if (forceNot !== false)
            this.newToken();
    }

    close(arg) {
        delete this.Code;
        return arg || this;
    }
    error(id) {
        this.Errored = true;
        return id;
    }

    get Tokens() { return new CheddarTokens(this._Tokens) }
    set Tokens(v) {
        if (Array.isArray(v))
            this._Tokens.push(...v);
        else
            this._Tokens.push(v);
    }

    get isLast() { return this.Index === this.Code.length }

    parse(parseClass, ...args) {
        if (parseClass.prototype instanceof CheddarLexer) {
            // Run provided parser
            let Parser = new parseClass(this.Code, this.Index);
            let ParserResult = Parser.exec(...args);

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

    attempt(...parsers) {
        let attempt;
        for (let i = 0; i < parsers.length; i++) {
            if (parsers[i] instanceof CheddarLexer) {
                parsers[i].Code = this.Code;
                parsers[i].Index = this.Index;
                attempt = parsers[i].exec();
            } else {
                attempt = this.initParser(parsers[i]).exec();
            }
            if (attempt instanceof CheddarLexer)
                return attempt;
            else if (attempt !== CheddarError.EXIT_NOTFOUND)
                return this.error(attempt);
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
        } else
            throw new TypeError('CheddarLexer: provided parser is not a CheddarLexer ');
    }

    tok(n = 0) { return this._Tokens[n] }

    grammar(whitespace, ...defs) { //TODO: remove unused stuff (if any)
        // defs<Array<CheddarLexer or String>>
        let index,
            parser,
            result,
            tokens,
            i,
            j;

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

                    if (result === CheddarError.EXIT_NOTFOUND)
                        continue main;
                    else if (!(result instanceof CheddarLexer))
                        return this.error(result);

                    index = parser.Index;

                    tokens.push(result);
                } else if (defs[i][j].prototype instanceof CheddarLexer) {
                    parser = new (defs[i][j])(this.Code, index);
                    result = parser.exec();

                    if (result === CheddarError.EXIT_NOTFOUND)
                        continue main;
                    else if (!(result instanceof CheddarLexer))
                        return this.error(result);

                    index = parser.Index;

                    // Filters out meaningless data
                    if (!(
                        (
                            result.constructor.name.endsWith('Alpha') ||
                            result.constructor.name.endsWith('Beta')
                        ) &&
                        result._Tokens.length === 0))
                        tokens.push(result);
                } else if (defs[i][j] === this.jumpWhite) {
                    let oldIndex = this.Index;
                    this.Index = index;
                    this.jumpWhite();
                    index = this.Index;
                    this.Index = oldIndex;
                } else if (Array.isArray(defs[i][j])) {
                    if (defs[i][j].length === 1) {
                        if (Array.isArray(defs[i][j][0])) {
                            // TODO: not recommended; creates 2^optionals new rules
                            //slice(0) clones array
                            let def = defs[i].slice(0);
                            def.splice(j, 1);
                            defs.splice(i + 1, 0, def);
                            defs[i].splice(j, 1, ...(defs[i][j][0]));
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
                                if (!(
                                    (
                                        result.constructor.name.endsWith('Alpha') ||
                                        result.constructor.name.endsWith('Beta')
                                    ) &&
                                    result._Tokens.length === 0))
                                    tokens.push(result);
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
                                if (result instanceof CheddarLexer) {
                                    match = result;
                                    index = result.Index;
                                    break;
                                }
                                if (result !== CheddarError.EXIT_NOTFOUND)
                                    return this.error(result);
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
                            if (!(
                                (
                                    result.constructor.name.endsWith('Alpha') ||
                                    result.constructor.name.endsWith('Beta')
                                ) &&
                                result._Tokens.length === 0)) {
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
                    if (result)
                        index = this.Index;
                    this.Index = oldIndex;
                    if (!result)
                        continue main;
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
        while (/\s/.test(this.Code[this.Index]))
            this.Index++;
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
                    while (this.curchar && this.curchar !== '\n')
                        this.Index++;
                    break;
                default:
                    return;
            }
            return;
        }

        //if (!(this.Code[this.Index] === this.Code[this.Index + 1] === '/'))
        //    return this;
        //this.Index = /\n/.exec(this.Code.slice(this.Index));
        //return this;
    }

    _jumpBlockComment() {
        let nextStart, nextEnd,
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
            if (nextEnd === -1)
                return this.error(CheddarError.UNEXPECTED_TOKEN);
        }
        this.Index = newIndex;
        return this;
    }

    jumpLiteral(l) {
        //TODO: make more efficient
        //downgoat D: this returned first index
        //took me 6 hours to figure out the problem :(
        //D: D: D:
        if (this.Code.indexOf(l, this.Index) === this.Index)
            this.Index += l.length;
        else
            return false;
        return this;
    }

    get isExpression() { return false; }

    get isPrimitive() { return false; }
}