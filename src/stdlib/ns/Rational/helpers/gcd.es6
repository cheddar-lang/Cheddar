// Rational extension written by LegionMammal978

export default function GCD(a, b) {
    [a, b] = [Math.abs(a), Math.abs(b)];
    while (b !== 0)
        [a, b] = [b, a % b];
    return a;
}
