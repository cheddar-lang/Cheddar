// Computes the greatest common denominator of
//  a and b, what did you expect?

export default function GCD(a, b) {
    while (b !== 0)
        [a, b] = [b, a % b];
    return a;
}
