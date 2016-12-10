import HelperLoc from './loc';
import colors from 'colors';

const HIGHLIGHT = (str, highlight) => highlight ? str.yellow : str

const FORMAT_LINE = (lines, highlight, start) => lines.map(
    (ln, i) => `${
        HIGHLIGHT(
            `${
                " ".repeat(
                    (lines.length + start + 1).toString().length -
                    (i + start + 1).toString().length
                ) + (i + start + 1)
            } |`
        , highlight)
    } ${ln}`
);

export default function caret (Code, Index, highlight) {
    let [line, col] = HelperLoc(Code, Index);
    let lines = Code.split(/\r?\n/);

    let start = Math.max( 0 , line - 1 );
    let end = Math.min(lines.length, line + 1);

    lines = FORMAT_LINE(lines.slice(start, end), highlight, start);
    lines.splice(
        start + 1, 0,
        (
            HIGHLIGHT(
                " ".repeat((lines.length + 1).toString().length + 1) + "|", highlight
            ) +
            " ".repeat(col + 1) + HIGHLIGHT("^", highlight)
        )
    );

    return lines.join("\n");
}
