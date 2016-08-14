// Rational extension written by LegionMammal978

import GCD from './gcd';

export default function add(num1, den1, num2, den2) {
    let gcd = GCD(den1, den2);
    return [den2 / gcd * num1 + den1 / gcd * num2, den1 / gcd * den2];
}
