// Rational extension written by LegionMammal978

import GCD from './gcd';

export default function mul(num1, den1, num2, den2) {
    let gcd = GCD(num1, den2) * GCD(den1, num2);
    return [num1 * num2 / gcd, den1 * den2 / gcd];
}
