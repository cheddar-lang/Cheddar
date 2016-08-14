// Rational extension written by LegionMammal978

import GCD from './gcd';

export default function pow(num1, den1, num2, den2, cheddar, CheddarRational) {
    // approximate for now, will implement properly later
    return cheddar.init(cheddar.number, 10, 0, Math.pow(num1 / den1, num2 / den2));
}
