// Locates an Column:Row given an index

export default function HelperLocateIndex(Code, Index) {
    let num = 1; // Line #
    let last = 0; // Last newline
    let i = 0;
    for (; i <= Index; i++)
        if (Code[i] === "\n") {
            num++; last = i;
        } else if (i === Index)
            return [num, i - last, i];

    return [num, i - last, i];
}
