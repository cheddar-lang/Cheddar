import CheddarLexer from '../tok/lex';

export default function CheddarCustomLexer(orig, ...args) {
    let parser = new CheddarLexer();
    parser.exec = function() {
        return new orig(this.Code, this.Index).exec(...args);
    };
    return parser;
}