export default function factor(n){
    let i = 2;
    let res = [];
    while(i <= n){
        while(n % i === 0){
            res.push(i);
            n /= i;
        }
        i++;
    }
    return res;
}
