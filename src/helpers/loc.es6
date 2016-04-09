// Locates an Column:Row given an index

export default function HelperLocateIndex(Code, Index) {
    let num = 1; // Line #
    let last = 0; // Last newline

    for (let i = 0; i <= Index; i++)
        if (Code[i] === "\n") {
            num++; last = i;
        } else if (i === Index)
            return [num, i - last];

}