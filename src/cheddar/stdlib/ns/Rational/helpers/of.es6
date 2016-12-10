// Rational extension written by LegionMammal978

import mul from './mul';

export default function of(val, cheddar, CheddarRational) {
    let num, den;
    switch (val.constructor.Name) {
        case "Rational":
            return val;
        case "String":
            let tmp = +val.value;
            if (!isNaN(tmp) && isFinite(tmp))
                return cheddar.init(CheddarRational, tmp, 1);
            [num, den] = val.value.split("/", 2);
            [num, den] = [+num, +den];
            if (!isNaN(num) && !isNaN(den) && isFinite(num) && isFinite(den)) {
                [num, den] = [of(cheddar.init(cheddar.number, 10, 0, num),
                    cheddar, CheddarRational),
                    of(cheddar.init(cheddar.number, 10, 0, den), cheddar,
                    CheddarRational)];
                return cheddar.init(CheddarRational, ...mul(num.num, num.den,
                    den.den, den.num));
            }
            break;
        case "Number":
            if (val.value === ~~val.value)
                return cheddar.init(CheddarRational, val.value, 1);
            if (!isNaN(val.value) && isFinite(val.value)) {
                let n = Math.abs(val.value);
                let sign = Math.sign(val.value), intPart = Math.trunc(n);
                let frac = n - intPart;
                let a = cheddar.init(CheddarRational, 0, 1), b =
                    cheddar.init(CheddarRational, 1, 1), c, A =
                    cheddar.init(CheddarRational, Math.round(frac), 1);
                while (true) {
                    c = cheddar.init(CheddarRational, a.num + b.num, a.den +
                        b.den);
                    if (c.den > 1000 || Math.abs(A.num / A.den - frac) < 0.0001)
                        break;
                    if (Math.abs(c.num / c.den - frac) < Math.abs(c.num / c.den
                        - A.num / A.den))
                        A = c;
                    if (a.num / a.den <= frac && frac <= c.num / c.den)
                        b = c;
                    else
                        a = c;
                }
                [num, den] = [A.num, A.den];
                num = sign * (intPart * den + num);
                return cheddar.init(CheddarRational, num, den);
            }
            break;
        case "Array":
            if (val.value.length === 0)
                break;
            if (val.value.length === 1)
                return of(val.value[0], cheddar, CheddarRational);
            [num, den] = [+val.value[0].value, +val.value[1].value];
            if (!isNaN(num) && !isNaN(den) && isFinite(num) && isFinite(den)) {
                [num, den] = [of(cheddar.init(cheddar.number, 10, 0, num),
                    cheddar, CheddarRational),
                    of(cheddar.init(cheddar.number, 10, 0, den), cheddar,
                    CheddarRational)];
                return cheddar.init(CheddarRational, ...mul(num.num, num.den,
                    den.den, den.num));
            }
            break;
        case "Boolean":
            if (val.value)
                return cheddar.init(CheddarRational, 1, 1);
            break;
    }
    return cheddar.init(CheddarRational, 0, 1);
}
